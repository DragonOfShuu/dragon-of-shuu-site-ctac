import { CameraControls } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"

export type NoClickOrbitControlsPropType = {
    makeDefault?: boolean,
}

function NoClickTruckControls(props: NoClickOrbitControlsPropType) {
    const ref = useRef<CameraControls>(null)
    const camera = useThree((state) => state.camera)
    const gl = useThree((state) => state.gl)

    const truckX = useRef(0);
    const truckY = useRef(0);

    useFrame((state, delta) => {
        if (!ref.current) return;

        const truckXDelta = state.pointer.x - truckX.current;
        const truckYDelta = truckY.current - state.pointer.y;
        truckX.current = state.pointer.x;
        truckY.current = state.pointer.y;

        ref.current.truck(truckXDelta, truckYDelta, true);
        ref.current.update(delta)
    })
 
    return <CameraControls ref={ref} args={[camera, gl.domElement]} enabled={false} makeDefault={props.makeDefault} />
}

export default NoClickTruckControls;