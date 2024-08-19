import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type SpinningBoxProps = Omit<MeshProps, "ref"> & {
    args?: [
        width: number | undefined,
        height: number | undefined,
        depth: number | undefined,
    ];
    canSpin?: boolean;
};

const SpinningBox = (props: SpinningBoxProps) => {
    const { canSpin, args, ...meshProps } = props;

    const meshRef = useRef<THREE.Mesh | null>(null);

    useFrame((state, delta) => {
        if (!meshRef.current || !(canSpin ?? true)) return;
        meshRef.current.rotation.x += delta;
        meshRef.current.rotation.y += delta * 1.1;
    });

    return (
        <mesh {...meshProps} ref={meshRef}>
            <boxGeometry args={args} />
            <meshStandardMaterial color={0xff4400} metalness={5} />
        </mesh>
    );
};

export default SpinningBox;
