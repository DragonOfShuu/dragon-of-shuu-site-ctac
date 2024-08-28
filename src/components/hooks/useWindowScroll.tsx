"use client";

import { useEffect, useState } from "react";

const useWindowScroll = () => {
    const [scrollY, setScrollY] = useState<number>(0);
    const [scrollX, setScrollX] = useState<number>(0);

    useEffect(() => {
        const onScroll = () => {
            setScrollX(window.scrollX);
            setScrollY(window.scrollY);
        };

        document.addEventListener("scroll", onScroll);

        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    });

    return { scrollX, scrollY };
};

export default useWindowScroll;
