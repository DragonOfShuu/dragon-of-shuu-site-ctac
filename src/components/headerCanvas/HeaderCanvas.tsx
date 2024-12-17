"use client";

import { Canvas } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";
import { ReactNode } from "react";

type Props = {
    className?: string;
    fallback?: ReactNode;
    enabled?: boolean;
    children: ReactNode
};

const HeaderCanvas = (props: Props) => {
    if (!(props.enabled ?? true)) return props.fallback;

    return (
        <ErrorBoundary fallback={<div className={`bg-black size-full`}></div>}>
            <Canvas className={props.className} fallback={<p>Unsupported</p>}>
                {props.children}
            </Canvas>
        </ErrorBoundary>
    );
};

export default HeaderCanvas;
