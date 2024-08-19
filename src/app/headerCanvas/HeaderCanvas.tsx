"use client";

import useWindowDimensions from "@/components/hooks/useWindowDimensions";
import { Canvas } from "@react-three/fiber";
import {
    DepthOfField,
    EffectComposer,
    Vignette,
} from "@react-three/postprocessing";
import { ErrorBoundary } from "react-error-boundary";
import HeaderScene from "./HeaderScene";
import { ReactNode } from "react";

type Props = {
    className?: string;
    fallback?: ReactNode;
    enabled?: boolean;
};

const HeaderCanvas = (props: Props) => {
    if (!(props.enabled ?? true)) return props.fallback;

    return (
        <ErrorBoundary fallback={<div className={`bg-black size-full`}></div>}>
            <Canvas className={props.className} fallback={<p>Unsupported</p>}>
                <HeaderScene />
            </Canvas>
        </ErrorBoundary>
    );
};

export default HeaderCanvas;
