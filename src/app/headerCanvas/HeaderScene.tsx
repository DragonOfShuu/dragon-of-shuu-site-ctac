import { useTexture, PresentationControls } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import SpinningBox from "./SpinningBox";
import HeaderPostProcess from "./HeaderPostProcess";

const HeaderScene = () => {
    const [texture] = useTexture(["textures/GridTexture.png"]);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);

    const [canSpin, setCanSpin] = useState(true);

    return (
        <>
            <PresentationControls snap>
                <group dispose={null}>
                    <SpinningBox
                        args={[1, 1, 1]}
                        canSpin={canSpin}
                        position={[0, 0, 0]}
                        onPointerDown={() => setCanSpin(false)}
                        onPointerUp={() => setCanSpin(true)}
                    />
                </group>
            </PresentationControls>
            <PerspectiveCamera
                makeDefault
                position={[-5, 0, -2]}
                rotation={[0, -89.6, 0]}
                fov={45.5}
                far={2000}
            />
            <mesh position={[20, 0, 0]} rotation={[0, 70.622, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial
                    color={`black`}
                    emissive={`orange`}
                    emissiveMap={texture}
                    emissiveIntensity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <pointLight intensity={Math.PI * 3} position={[-2, 2, 2]} />
            <pointLight intensity={Math.PI * 3} position={[-2, 0, -2]} />
            {/** Too much overhead :/ */}
            {/* <HeaderPostProcess /> */}
        </>
    );
};

export default HeaderScene;
