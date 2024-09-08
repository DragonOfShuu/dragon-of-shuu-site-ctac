"use client";

import { ChangeEvent, useEffect, useState } from "react";
import styles from "./ChooseSize.module.sass";
import rotateIcon from "../../icons/rotateItems.svg";
import { Block } from "../../CommonTypes";
import ToolBarButton from "../../toolBarElements/ToolBarButton";
import HowSizer from "../../help/HowSizer";
import { useVisualizer } from "../../contexts/VisualizerContext";
import { usePages } from "../../contexts/PageContext";
import useWindowDimensions from "@/components/hooks/useWindowDimensions";

const limit = 40;

const useBlockSizes = () => {
    const [xValue, setXValue] = useState<number>(24);
    const [yValue, setYValue] = useState<number>(8);

    const [tempX, setTempX] = useState<number | "">(xValue);
    const [tempY, setTempY] = useState<number | "">(yValue);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        const newX = Math.floor(width / 50);
        const newY = Math.floor(height / 75);
        setXValue(newX);
        setYValue(newY);
        setTempX(newX);
        setTempY(newY);
    }, [width, height]);

    const setSize = (event: ChangeEvent<HTMLInputElement>, isX: boolean) => {
        const sizeChange = (newValue: number | false) => {
            if (newValue == false) {
                event.preventDefault();
                if (isX) setTempX(xValue);
                else setTempY(yValue);
                return;
            }

            if (isX) {
                setXValue(newValue);
                setTempX(newValue);
            } else {
                setYValue(newValue);
                setTempY(newValue);
            }
        };

        if (event.target.value == "") {
            sizeChange(1);
            return;
        }

        const newValue = Number.parseInt(event.target.value);

        if (newValue <= 0 || newValue > limit) {
            sizeChange(false);
            return;
        }

        sizeChange(newValue);
    };

    return {
        xValue,
        setXValue,
        tempX,
        setTempX,
        yValue,
        setYValue,
        tempY,
        setTempY,
        setSize,
    };
};

const useGenerateVisuals = (xValue: number, yValue: number) => {
    const { vDispatch } = useVisualizer();

    useEffect(() => {
        let newBlocks = [];
        for (let y = 0; y < yValue; y++) {
            let row: Block[] = [];
            for (let x = 0; x < xValue; x++) {
                row.push({ mode: "ghost", trudge: 0, x: x, y: y });
            }
            newBlocks.push(row);
        }

        vDispatch({ type: "update", data: { blocks: newBlocks } });
    }, [xValue, yValue, vDispatch]);

    return null;
};

const ChooseSize = () => {
    const {
        xValue,
        setXValue,
        tempX,
        setTempX,
        yValue,
        setYValue,
        tempY,
        setTempY,
        setSize,
    } = useBlockSizes();

    const { setPage } = usePages();
    useGenerateVisuals(xValue, yValue);

    const rotateNumbers = () => {
        setXValue(yValue);
        setTempX(yValue);
        setYValue(xValue);
        setTempY(xValue);
    };

    return (
        <>
            <input
                type="number"
                onChange={(event) =>
                    setTempX(Number.parseInt(event.target.value) ?? "")
                }
                onBlur={(event) => setSize(event, true)}
                value={tempX}
                className={`${styles.sizeAdjust}`}
                min={1}
                max={limit}
                title="X length of the board"
            />
            <h2 className={`text-lg md:text-2xl self-center`}>X</h2>
            <input
                type="number"
                onChange={(event) =>
                    setTempY(Number.parseInt(event.target.value) ?? "")
                }
                onBlur={(event) => setSize(event, false)}
                value={tempY}
                className={`${styles.sizeAdjust}`}
                min={1}
                max={limit}
                title="Y length of the board"
            />
            {/* className={`w-14`} */}
            <ToolBarButton
                onClick={rotateNumbers}
                alt={`Rotate Values`}
                image={rotateIcon}
            />

            <div className={`grow`} />

            <HowSizer />
            <ToolBarButton
                onClick={() => setPage("PAINTER")}
                text="Finish"
                className={`px-8`}
            />
        </>
    );
};

export default ChooseSize;
