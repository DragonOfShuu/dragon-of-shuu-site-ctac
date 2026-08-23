"use client";

import { useEffect, useRef, RefObject } from "react";

interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
    onChange?: (isIntersecting: boolean) => void;
    onEnter?: () => void;
    onLeave?: () => void;
}

interface UseIntersectionObserverResult {
    ref: RefObject<HTMLDivElement | null>;
    isIntersecting?: boolean;
}

const useIntersectionObserver = (
    options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverResult => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const isIntersecting = entry.isIntersecting;

                if (options.onChange) {
                    options.onChange(isIntersecting);
                }

                if (isIntersecting && options.onEnter) {
                    options.onEnter();
                }

                if (!isIntersecting && options.onLeave) {
                    options.onLeave();
                }
            },
            {
                threshold: options.threshold || 0,
                root: options.root || null,
                rootMargin: options.rootMargin || "0px",
            },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [options]);

    return { ref };
};

export default useIntersectionObserver;
