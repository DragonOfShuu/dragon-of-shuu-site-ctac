'use client';

import { Canvas } from "@react-three/fiber";

const ThreeDCanvas = () => {
    return (
        <Canvas>
            <mesh>
                <boxGeometry>
                </boxGeometry>
            </mesh>
        </Canvas>
    )
}

export default ThreeDCanvas;