"use client";

import { useEffect } from "react";

const useInterval = (
    callback: () => void,
    interval: number,
    init?: () => void,
) => {
    console.log("Ran useinterval");

    useEffect(() => {
        const interId = setInterval(callback, interval);
        console.log("Ran useinterval effect");
        init?.();
        return () => {
            clearInterval(interId);
        };
    }, [interval, callback, init]);

    return null;
};

export default useInterval;
