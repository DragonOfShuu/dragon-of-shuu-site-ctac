"use client";

import { useEffect, useState, MouseEvent, ReactNode } from "react";
import styles from "./Block.module.sass";
import stylesTrudge from "./Trudge.module.sass";
import FlagIcon from "../icons/flagIcon.svg";
import { Block, Trudge } from "../CommonTypes";

type BlockType = Block & {
    blockClicked: (
        block: { x: number; y: number },
        isNewClick: boolean,
    ) => void;
};

export default function DisplayBlock({
    mode,
    role,
    trudge,
    blockClicked,
    x,
    y,
}: BlockType): ReactNode {
    const [className, setClassName] = useState<string>(styles.ghost);

    const findingStyle: { [mode: string]: string } = {
        found: styles.found,
        finding: styles.finding,
        path: styles.path,
    };

    useEffect(() => {
        let newClassname = "";

        if (mode == "ghost") {
            newClassname += styles.ghost;
        } else if (mode == "barrier") {
            newClassname += styles.barrier;
        } else {
            newClassname += styles.available + " ";

            if (trudge == Trudge.ASPHALT) {
                newClassname += stylesTrudge.asphalt;
            } else if (trudge == Trudge.GRASS) {
                newClassname += stylesTrudge.grass;
            } else if (trudge == Trudge.MUD) {
                newClassname += stylesTrudge.mud;
            } else if (trudge == Trudge.WATER) {
                newClassname += stylesTrudge.water;
            }
        }

        setClassName(newClassname);
    }, [mode, trudge]);

    const onMouseDown = (
        event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
        newClick?: boolean,
    ) => {
        const theNewClick = newClick ?? true;

        if (event.buttons == 1) {
            blockClicked({ x, y }, theNewClick);
        }
    };

    const onTouchStart = (
        event: React.TouchEvent<HTMLDivElement>,
        newClick?: boolean,
    ) => {
        const theNewClick = newClick ?? true;

        blockClicked({ x, y }, theNewClick);
    };

    const onMouseOver = (
        event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    ) => {
        if (event.buttons != 0) {
            onMouseDown(event, false);
        }
    };

    return (
        <div
            className={`w-full h-full grid grid-cols-1 grid-rows-1 place-items-center`}
            onMouseOver={onMouseOver}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
        >
            {" "}
            {/* grid grid-cols-1 grid-rows-1 */}
            <div
                className={`w-full h-full z-20 ${styles.baseOverlay} ${findingStyle[mode] ?? ""}`}
                style={{ gridColumn: 1, gridRow: 1 }}
            >
                {["available", "found", "path", "finding"].includes(mode) &&
                role !== undefined ? (
                    <>
                        <div
                            className={`z-30 w-full h-full grid grid-cols-1 grid-rows-1 place-items-center opacity-100`}
                            style={{ containerType: "size" }}
                        >
                            <FlagIcon
                                alt={role}
                                className={styles.flag}
                                style={{ gridColumn: 1, gridRow: 1 }}
                            />
                            <p
                                className={`text-sm ${styles.flagText}`}
                                style={{ gridColumn: 1, gridRow: 1 }}
                            >
                                {role.toUpperCase()}
                            </p>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <div
                className={`w-full h-full z-10 ${className ? className : ""} ${styles.block}`}
                style={{ gridColumn: 1, gridRow: 1 }}
            ></div>
        </div>
    );
}
