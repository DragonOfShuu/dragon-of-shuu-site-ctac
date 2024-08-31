"use client";

import SpecialButton from "@/components/SpecialButton";
import HeaderCanvas from "./headerCanvas/HeaderCanvas";
import { useState } from "react";
import useWindowDimensions from "@/components/hooks/useWindowDimensions";
import Image from "next/image";
import headerImage from "@/assets/abstractCommon/HeaderBackground.png";
import headerImage3D from "@/assets/abstractCommon/HeaderBackgroundFor3d.png";

type Props = {
    className?: string;
};

const DisableableHeaderCanvas = (props: Props) => {
    const [canvasEnabled, setCanvasEnabled] = useState<boolean>(true);

    const { width } = useWindowDimensions();
    const allowedWidth = width >= 1024;

    const backupContent = (
        <>
            <Image
                src={headerImage}
                alt={`Page header`}
                className={`size-full object-cover`}
            />
            <div className={`absolute inset-0 background-dark-double-shade`} />
        </>
    );

    return (
        <div className={props.className}>
            <div className={`size-full relative`}>
                {!canvasEnabled || !allowedWidth ? (
                    backupContent
                ) : (
                    <>
                        <HeaderCanvas />
                        <div className={`absolute inset-0 -z-10`}>
                            <Image
                                src={headerImage3D}
                                className={`object-cover size-full hue-rotate-15 brightness-[.1]`}
                                alt={`Header background`}
                            />
                        </div>
                    </>
                )}
                {!allowedWidth ? (
                    <></>
                ) : (
                    <SpecialButton
                        onClick={() => setCanvasEnabled((e) => !e)}
                        className={`absolute right-0 bottom-0 mb-4 mr-4 text-sm`}
                    >
                        {`${canvasEnabled ? "Disable" : "Enable"} 3D Graphics`}
                    </SpecialButton>
                )}
            </div>
        </div>
    );
};

export default DisableableHeaderCanvas;
