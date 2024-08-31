import SpaceshipScene from '@/assets/3d/scenes/SpaceshipScene'
import NoClickTruckControls from "@/assets/3d/cameraControls/NoClickOrbitControls";
import { CameraShake } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const HeaderScene = () => {
    // const [texture] = useTexture(["textures/GridTexture.png"]);
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(10, 10);

    const shakeMax = 0.005
    const shakeFrequency = 2
    const shakeIntensity = 1

    return (
        <>
            <NoClickTruckControls makeDefault={true} />
            <CameraShake maxPitch={shakeMax} maxRoll={shakeMax} maxYaw={shakeMax} yawFrequency={shakeFrequency} rollFrequency={shakeFrequency} pitchFrequency={shakeFrequency} intensity={shakeIntensity} />
            <group dispose={null}>
                <SpaceshipScene position={[3, 0, -3]} />
            </group>
        </>
    );
};

export default HeaderScene;
