"use client";

import SpaceshipScene from "@/assets/3d/scenes/SpaceshipScene";
import NoClickTruckControls from "@/assets/3d/cameraControls/NoClickOrbitControls";
import { CameraShake } from "@react-three/drei";

const SpaceshipWithControls = () => {
    const shakeMax = 0.005;
    const shakeFrequency = 1;
    const shakeIntensity = 0.5;

    return (
        <>
            <NoClickTruckControls makeDefault={true} />
            <CameraShake
                maxPitch={shakeMax}
                maxRoll={shakeMax}
                maxYaw={shakeMax}
                yawFrequency={shakeFrequency}
                rollFrequency={shakeFrequency}
                pitchFrequency={shakeFrequency}
                intensity={shakeIntensity}
            />
            <group dispose={null}>
                <SpaceshipScene position={[3, 0, -3]} />
            </group>
        </>
    );
};

export default SpaceshipWithControls;
