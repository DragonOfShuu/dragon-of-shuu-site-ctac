import SpaceshipScene from '@/assets/3d/scenes/SpaceshipScene'
import NoClickTruckControls from "@/assets/3d/cameraControls/NoClickOrbitControls";

const HeaderScene = () => {
    // const [texture] = useTexture(["textures/GridTexture.png"]);
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(10, 10);

    return (
        <>
            <NoClickTruckControls />
            <group dispose={null}>
                <SpaceshipScene position={[3, 0, -3]} />
            </group>
        </>
    );
};

export default HeaderScene;
