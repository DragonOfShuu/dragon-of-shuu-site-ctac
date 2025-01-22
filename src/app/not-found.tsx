"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { randomInt } from "@/clientlibs/random";
import styles from "./not-found.module.sass";

const NotFound = () => {
    const { shiftX, shiftY } = useRandomShift(-10, 10, 250);

    return (
        <>
            <div
                className={`pt-nav-margin absolute inset-0 flex flex-col gap-1 items-center justify-center`}
            >
                <h1
                    style={{
                        transform: `translateX(${shiftX}px) translateY(${shiftY}px)`,
                    }}
                    className={`transition-all`}
                >
                    NOT FOUND
                </h1>
                <p>The Requested Resource Does Not Exist</p>
                <Link href={`/`} className={`special-button mt-4`}>
                    Return Home
                </Link>
            </div>
            <div
                className={`absolute inset-0 -z-10 flex items-center justify-center`}
            >
                <p
                    className={`text-[12rem] font-bold text-orange-500 opacity-10`}
                >
                    404
                </p>
            </div>
            <div className={`absolute inset-0 -z-20 overflow-hidden`}>
                <div
                    className={`${styles.repeatingBackground} ${styles.movingBackground}`}
                ></div>
            </div>
        </>
    );
};

const useRandomShift = (low: number, high: number, ms: number) => {
    const [shiftX, setShiftX] = useState<number>(0);
    const [shiftY, setShiftY] = useState<number>(0);

    useEffect(() => {
        const randomInterval = setInterval(() => {
            setShiftX(randomInt(low, high));
            setShiftY(randomInt(low, high));
        }, ms);

        return () => {
            clearInterval(randomInterval);
        };
    }, [high, low, ms]);

    return { shiftX, shiftY };
};

export default NotFound;
