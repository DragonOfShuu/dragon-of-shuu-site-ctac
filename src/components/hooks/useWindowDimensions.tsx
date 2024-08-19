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

export default useWindowDimensions;
