"use client";

import { Canvas } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";
import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
    className?: string;
    fallback?: ReactNode;
    enabled?: boolean;
    children: ReactNode;
};

/**
 * Wraps R3F Canvas with automatic WebGL context-loss recovery.
 *
 * Why this is needed:
 * `cacheComponents: true` in next.config.mjs keeps page component trees
 * mounted-but-hidden (0×0 px) while navigating to other routes.  Browsers
 * reclaim WebGL contexts from 0×0 canvases to free GPU memory.  When the
 * user navigates back the canvas is visible again but the context is gone and
 * R3F has no built-in recovery path — the scene stays blank.
 *
 * Recovery strategy:
 * 1. `webglcontextlost` fires while the page is hidden → set a flag.
 * 2. A ResizeObserver watches the container div.  When the container grows
 *    from 0×0 back to a real size (page becomes active again) and the flag
 *    is set, increment `canvasKey` to unmount the stale Canvas and mount a
 *    fresh one with a brand-new WebGL context.
 */
const HeaderCanvas = (props: Props) => {
    const [canvasKey, setCanvasKey] = useState(0);
    const contextLostRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                // Container just became visible again after being hidden
                if (width > 0 && height > 0 && contextLostRef.current) {
                    contextLostRef.current = false;
                    setCanvasKey((k) => k + 1);
                }
            }
        });

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    if (!(props.enabled ?? true)) return props.fallback ?? null;

    return (
        <ErrorBoundary fallback={<div className={`bg-black size-full`} />}>
            <div ref={containerRef} className="size-full">
                <Canvas
                    key={canvasKey}
                    className={props.className}
                    fallback={<p>Unsupported</p>}
                    onCreated={({ gl }) => {
                        gl.domElement.addEventListener(
                            "webglcontextlost",
                            () => {
                                contextLostRef.current = true;
                            },
                            false,
                        );
                    }}
                >
                    {props.children}
                </Canvas>
            </div>
        </ErrorBoundary>
    );
};

export default HeaderCanvas;
