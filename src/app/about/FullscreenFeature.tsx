import { ReactNode } from "react";

type FullscreenFeaturePropType = {
    children?: ReactNode;
}

const FullscreenFeature = (props: FullscreenFeaturePropType) => {
    return (
        <div className={`h-screen py-4`}>
            {props.children}
        </div>
    )
}

export default FullscreenFeature;