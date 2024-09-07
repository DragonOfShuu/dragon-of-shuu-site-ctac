"use client";

import { useEffect } from "react";

const useInterval = (
    callback: () => void,
    interval: number,
    init?: () => void,
) => {
    useEffect(() => {
        const interId = setInterval(callback, interval);
        init?.();
        return () => {
            clearInterval(interId);
        };
    }, [interval, callback, init]);

    return null;
};

export default useInterval;
