"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import playIcon from "../../icons/play.svg";
import resetIcon from "../../icons/rotateItems.svg";
import Settings from "../../Settings";
import { Block, Coord, Trudge } from "../../CommonTypes";
import { useVisualizer } from "../../contexts/VisualizerContext";
import TileTypeChooser from "../TileTypeChooser";
import ToolBarButton from "../../toolBarElements/ToolBarButton";
import ReturnToSizerDialog from "../../ReturnToSizerDialog";
import HowPainter from "../../help/HowPainter";
import { usePages } from "../../contexts/PageContext";
import MobileExpandMenu from "@/app/minis/fastest-pather/pageModules/painter/MobileExpandMenu";

type Props = {};

const Painter = ({}: Props) => {
    const { setPage } = usePages();
    const { vData, vDispatch } = useVisualizer();

    const [xValue, yValue] = [vData.blocks[0].length, vData.blocks.length];

    /**
     * When set as 'start' or 'end', it means the user is currently
     * deciding where the corresponding flag should go
     */
    const [flagLoc, setFlagLoc] = useState<"start" | "end" | undefined>(
        undefined,
    );

    const [startLoc, setStartLoc] = useState<{ x: number; y: number }>(
        vData.pointPos != undefined ? vData.pointPos.start : { x: 0, y: 0 },
    );
    const [endLoc, setEndLoc] = useState<{ x: number; y: number }>(
        vData.pointPos != undefined
            ? vData.pointPos.end
            : { x: xValue - 1, y: yValue - 1 },
    );

    const [trudgePaint, setTrudgePaint] = useState<Trudge>(Trudge.GRASS);

    const isSwitchToBarrier = useRef<boolean>(true);
    const isPaint = useRef<boolean>(true);

    const blockClicked = useCallback(
        ({ x, y }: { x: number; y: number }, newClick: boolean) => {
            const flagChange = (block: Block) => {
                const newBlocks = [...vData.blocks]
                // If block mode equals barrier,
                // Change to available
                if (block.mode == "barrier") {
                    block.mode = "available";
                    // If it's not available or barrier,
                    // rset flag loc
                } else if (block.mode != "available") {
                    setFlagLoc(undefined);
                    return;
                }

                if (block.role === flagLoc) {
                    // Block role and flag target selection match. Nullify this set
                    setFlagLoc(undefined);
                    return;
                } else if (block.role != undefined) {
                    // Swap start and end
                    const newStart: Coord = { x: endLoc.x, y: endLoc.y };
                    const newEnd: Coord = { x: startLoc.x, y: startLoc.y };
                    newBlocks[startLoc.y][startLoc.x].role = "end";
                    setStartLoc(newStart);
                    newBlocks[endLoc.y][endLoc.x].role = "start";
                    setEndLoc(newEnd);
                } else {
                    newBlocks[block.y][block.x].role = flagLoc;

                    if (flagLoc == "start") {
                        newBlocks[startLoc.y][startLoc.x].role = undefined;
                        setStartLoc({ x: block.x, y: block.y });
                    } else {
                        newBlocks[endLoc.y][endLoc.x].role = undefined;
                        setEndLoc({ x: block.x, y: block.y });
                    }
                }

                vDispatch({ type: "update", data: { blocks: newBlocks } });
                setFlagLoc(undefined);
            };

            const block = {...vData.blocks[y][x]};
            const isAvailableNow = block.mode == "available";

            if (flagLoc != undefined) {
                flagChange(block);
                return;
            }

            if (newClick) {
                isSwitchToBarrier.current = isAvailableNow
                    ? trudgePaint == block.trudge
                    : false;
                isPaint.current =
                    !isAvailableNow || trudgePaint != block.trudge;
            }

            if (block.role == undefined)
                block.mode = isSwitchToBarrier.current
                    ? "barrier"
                    : "available";

            if (isPaint.current) {
                block.trudge = trudgePaint;
            }

            vDispatch({ type: "block", newBlock: block });
        },
        [
            vData.blocks,
            flagLoc,
            vDispatch,
            endLoc.x,
            endLoc.y,
            startLoc.x,
            startLoc.y,
            trudgePaint,
        ],
    );

    useEffect(() => {
        vDispatch({ type: "update", data: { blockClicked: blockClicked } });
    }, [blockClicked, vDispatch]);

    useEffect(() => {
        vDispatch({
            type: "update",
            data: { pointPos: { start: startLoc, end: endLoc } },
        });
    }, [startLoc, endLoc, vDispatch]);

    useEffect(
        () => vDispatch({ type: "toolbar", enabled: !flagLoc }),
        [flagLoc, vDispatch],
    );

    const resetBoard = useCallback(() => {
        vDispatch({ type: "toolbar", enabled: false });

        let newBlocks: Block[][] = [];
        for (let y = 0; y < yValue; y++) {
            newBlocks.push([]);
            for (let x = 0; x < xValue; x++) {
                newBlocks[y].push({
                    mode: "ghost",
                    x: x,
                    y: y,
                    trudge: trudgePaint,
                });
            }
        }

        newBlocks[0][0].role = "start";
        setStartLoc({ x: 0, y: 0 });
        newBlocks[yValue - 1][xValue - 1].role = "end";
        setEndLoc({ x: xValue - 1, y: yValue - 1 });

        // setBlocks(newBlocks)

        for (let x = 0; x < newBlocks[0].length; x++) {
            setTimeout(
                () => {
                    const theBlocks = [...newBlocks];
                    theBlocks.forEach((row) => {
                        row[x].mode = "available";
                    });
                    // setBlocks(theBlocks)
                    vDispatch({ type: "blocks", newBlocks: theBlocks });
                },
                (1000 / newBlocks[0].length) * x + 100,
            );
        }

        setTimeout(() => {
            vDispatch({ type: "toolbar", enabled: true });
        }, 1100);
    }, [vDispatch, yValue, xValue, trudgePaint]);

    useEffect(() => {
        if (vData.blocks[0][0].mode === "ghost") resetBoard();
    }, [resetBoard, vData.blocks]);

    const disconnectBlockClicked = () => {
        vDispatch({ type: "update", data: { blockClicked: undefined } });
    };

    const playSim = () => {
        disconnectBlockClicked();
        setPage("RUNNER");
    };

    return (
        <>
            <MobileExpandMenu>
                <ToolBarButton
                    alt="Reset Board"
                    onClick={resetBoard}
                    image={resetIcon}
                />

                <ToolBarButton
                    onClick={() => {
                        setFlagLoc("start");
                    }}
                    text="Set Start"
                />
                <ToolBarButton
                    onClick={() => {
                        setFlagLoc("end");
                    }}
                    text="Set End"
                />
                
                <div className={`h-14 lg:h-full`}>
                    <TileTypeChooser setTrudge={setTrudgePaint} />
                </div>
            </MobileExpandMenu>

            <div className="flex-grow"></div>

            <HowPainter />

            <ReturnToSizerDialog beforePageChange={disconnectBlockClicked} />

            <Settings />

            <ToolBarButton
                onClick={playSim}
                image={playIcon}
                alt="Play Simulation"
            />
        </>
    );
};

export default Painter;
