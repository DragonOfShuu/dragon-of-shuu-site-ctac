import { useCallback, useEffect, useRef, useState } from "react";
import { Block, Coord } from "../../CommonTypes";
import { StarState, findFastestPath } from "../../DeterminePath";
import squareIcon from "../../icons/square.svg";
import ToolBarButton from "../../toolBarElements/ToolBarButton";
import HowRunner from "../../help/HowRunner";
import { StartEnd, useVisualizer } from "../../contexts/VisualizerContext";
import { usePages } from "../../contexts/PageContext";
import { useSettings } from "../../contexts/SettingsContext";

type Props = {};

const Runner = ({}: Props) => {
    const { vData, vDispatch } = useVisualizer();
    const { setPage } = usePages();
    const { sData } = useSettings();

    const previousState = useRef<Block[][]>(
        JSON.parse(JSON.stringify(vData.blocks)),
    );

    const [operationText, setOperationText] = useState<string>("Finding...");

    /**
     * Shows the path that was taken
     * to get to the end.
     */
    const triggerEnd = useCallback(
        (path: { x: number; y: number }[]) => {
            setOperationText("Revealing...");
            vDispatch({ type: "toolbar", enabled: false });
            path.forEach((block, index) => {
                setTimeout(
                    (blockIndex, max) => {
                        const newBlocks = [...vData.blocks];
                        newBlocks[block.y][block.x].mode = "path";
                        vDispatch({ type: "blocks", newBlocks });
                        setOperationText(`Revealing... ${blockIndex}/${max}`);
                    },
                    (sData.pathRevealSpeed / path.length) * index,
                    index + 1,
                    path.length,
                );
            });

            setTimeout(() => {
                vDispatch({ type: "toolbar", enabled: true });
                setOperationText("Found.");
            }, sData.pathRevealSpeed);
        },
        [vDispatch, sData.pathRevealSpeed, vData.blocks],
    );

    const SimHeart = (starState: StarState, clearCallback: Function) => {
        const allNewBlocks = [...vData.blocks];

        findFastestPath(allNewBlocks, starState, sData);

        starState.closed_list.forEach((block) => {
            const display = allNewBlocks[block.coords.y][block.coords.x];
            display.mode = "found";
        });
        starState.open_list.forEach((block) => {
            const display = allNewBlocks[block.coords.y][block.coords.x];
            display.mode = "finding";
        });

        // setBlocks(allNewBlocks);
        vDispatch({ type: "blocks", newBlocks: allNewBlocks });
        if (starState.recent_node != undefined)
            setOperationText(
                `Finding... (Current expense: ${Math.round(starState.recent_node.f * 100) / 100})`,
            );

        if (starState.solvable === undefined) return;

        if (starState.solvable && starState.solve_path != undefined) {
            triggerEnd(starState.solve_path as Coord[]);
        } else {
            setOperationText("Not found.");
            // setToolbarEnabled(true)
            vDispatch({ type: "toolbar", enabled: true });
        }

        clearCallback();
    };

    useEffect(() => {
        let pointLoc = vData.pointPos as StartEnd;
        let state = new StarState(pointLoc.start, pointLoc.end);
        let leInterval: undefined | NodeJS.Timer;

        function clearCallback() {
            clearInterval(leInterval);
        }

        leInterval = setInterval(
            SimHeart,
            sData.algoSpeed,
            state,
            clearCallback,
        );

        // When this component is disconnected,
        // clear the interval
        return clearCallback;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const switchBack = () => {
        // setBlocks(previousState.current)
        vDispatch({ type: "blocks", newBlocks: previousState.current });
        // props.setPage(Page.PAINTER)
        setPage("PAINTER");
    };

    return (
        <>
            <p className="self-end text-2xl">{operationText}</p>

            <div className="grow" />

            <HowRunner />
            <ToolBarButton
                onClick={switchBack}
                image={squareIcon}
                alt={`Return to Painter`}
            />
        </>
    );
};

export default Runner;
