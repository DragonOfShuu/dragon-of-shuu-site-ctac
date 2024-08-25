"use client";

import { useEffect, useState } from "react";

const useWindowDimensions = () => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        const resize = (e: UIEvent) => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return { width, height };
};

export const SMALL_SCREEN_SIZE = 320;
export const MEDIUM_SCREEN_SIZE = 768;
export const LARGE_SCREEN_SIZE = 1024;
export const EXTRA_SCREEN_SIZE = 1080;

export const aboveSm = (width: number) => {
    return width >= SMALL_SCREEN_SIZE;
}

export const aboveMd = (width: number) => {
    return width >= MEDIUM_SCREEN_SIZE;
}

export const aboveLg = (width: number) => {
    return width >= LARGE_SCREEN_SIZE;
}

export const aboveXl = (width: number) => {
    return width >= EXTRA_SCREEN_SIZE;
}

export default useWindowDimensions;
