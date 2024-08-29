import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

type Props = {};

const Spaceship = (props: Props) => {
    const spaceship = useLoader(GLTFLoader, "models/SpaceshipScene.glb");

    return <primitive object={spaceship.scene} position={[0, 0, 0]} />;
};

export default Spaceship;
