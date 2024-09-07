/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 .\SpaceshipScene.glb --transform 
Files: .\SpaceshipScene.glb [389.23KB] > X:\Assets\Code\website-v3\public\models\SpaceshipScene-transformed.glb [44.94KB] (88%)
*/

import React from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import useRandomSelection from "@/components/hooks/useRandomSelection";

export default function SpaceshipScene(props) {
    const group = React.useRef();
    const { scene, animations } = useGLTF("/SpaceshipScene-transformed.glb");
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone);
    const { actions } = useAnimations(animations, group);

    useRandomSelection(Object.keys(actions), 100, (animName) => {
        // Written like this so in case all the anims
        // are null at first, then we can still pull
        // the new data
        const anim = actions[animName];
        anim?.play();
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <PerspectiveCamera
                    name="Camera"
                    makeDefault={true}
                    far={100}
                    near={0.1}
                    fov={18.55}
                    position={[14.768, 20.984, 22.068]}
                    rotation={[-0.791, 0.551, 0.283]}
                />
                <spotLight
                    intensity={150}
                    angle={Math.PI / 8}
                    penumbra={0.15}
                    decay={2}
                    position={[2.318, 8.487, 8.01]}
                    rotation={[-0.709, 0.153, 0.779]}
                    target={nodes.Spot004.target}
                >
                    <primitive
                        object={nodes.Spot004.target}
                        position={[0, 0, -1]}
                    />
                </spotLight>
                <spotLight
                    intensity={30}
                    angle={Math.PI / 8}
                    penumbra={0.15}
                    decay={2}
                    position={[-7.64, 8.487, -9.062]}
                    rotation={[-2.218, -0.632, -1.83]}
                    target={nodes.Spot005.target}
                >
                    <primitive
                        object={nodes.Spot005.target}
                        position={[0, 0, -1]}
                    />
                </spotLight>
                <spotLight
                    intensity={20}
                    angle={Math.PI / 8}
                    penumbra={0.15}
                    decay={2}
                    position={[10.34, -3.813, -7.629]}
                    rotation={[2.584, 0.816, -1.14]}
                    target={nodes.Spot006.target}
                >
                    <primitive
                        object={nodes.Spot006.target}
                        position={[0, 0, -1]}
                    />
                </spotLight>
                <group
                    name="SideJetEngines003"
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={[0.531, 1, 0.531]}
                >
                    <mesh
                        name="Cylinder010"
                        geometry={nodes.Cylinder010.geometry}
                        material={materials.Metal}
                    />
                    <mesh
                        name="Cylinder010_1"
                        geometry={nodes.Cylinder010_1.geometry}
                        material={materials.BlueGlow}
                    />
                </group>
                <mesh
                    name="MainFrame003"
                    geometry={nodes.MainFrame003.geometry}
                    material={materials.Glass}
                />
                <mesh
                    name="SideJetEngines004"
                    geometry={nodes.SideJetEngines004.geometry}
                    material={materials.Emissions}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={[0.531, 1, 0.531]}
                />
                <mesh
                    name="Star214"
                    geometry={nodes.Star214.geometry}
                    material={materials.BlueGlow}
                    position={[-19.265, -15.973, 0.682]}
                    rotation={[0, 0, -2.214]}
                    scale={[0.239, 0.239, 0]}
                />
                <mesh
                    name="Star001"
                    geometry={nodes.Star001.geometry}
                    material={materials.BlueGlow}
                    position={[-23.698, -10.469, -1.004]}
                    rotation={[0, 0, -2.214]}
                    scale={[0.239, 0.239, 0]}
                />
                <mesh
                    name="Star002"
                    geometry={nodes.Star002.geometry}
                    material={materials.BlueGlow}
                    position={[-9.851, -17.183, -6.322]}
                    rotation={[0, 0, -2.214]}
                    scale={[0.239, 0.239, 0]}
                />
                <mesh
                    name="Star003"
                    geometry={nodes.Star003.geometry}
                    material={materials.BlueGlow}
                    position={[-23.116, -15.784, 3.855]}
                    rotation={[0, 0, -2.214]}
                    scale={[0.239, 0.239, 0]}
                />
                <mesh
                    name="Star004"
                    geometry={nodes.Star004.geometry}
                    material={materials.BlueGlow}
                    position={[-3.52, -19.858, -9.152]}
                    rotation={[0, 0, -2.214]}
                    scale={[0.239, 0.239, 0]}
                />
                <mesh
                    name="Star005"
                    geometry={nodes.Star005.geometry}
                    material={materials.BlueGlow}
                    position={[-13.332, -15.007, -5.479]}
                    rotation={[0, 0, -2.214]}
                    scale={[0.239, 0.239, 0]}
                />
                <mesh
                    name="Star006"
                    geometry={nodes.Star006.geometry}
                    material={materials.BlueGlow}
                    position={[-36.026, -11.114, -9.155]}
                    rotation={[0, 0, -2.214]}
                    scale={[0.239, 0.239, 0]}
                />
                <mesh
                    name="Star007"
                    geometry={nodes.Star007.geometry}
                    material={materials.BlueGlow}
                    position={[-11.556, -15.784, 7.825]}
                    rotation={[0, 0, -2.214]}
                    scale={[0.239, 0.239, 0]}
                />
            </group>
        </group>
    );
}

useGLTF.preload("/SpaceshipScene-transformed.glb");
