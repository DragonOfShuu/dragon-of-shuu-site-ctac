"use client";

import SpecialButton from "@/components/SpecialButton";
import HeaderCanvas from "./HeaderCanvas";
import { ReactNode, useEffect, useState } from "react";
import useWindowDimensions from "@/components/hooks/useWindowDimensions";
import Image from "next/image";
import headerImage from "@/assets/abstractCommon/HeaderBackground.png";
import headerImage3D from "@/assets/abstractCommon/HeaderBackgroundFor3d.png";
import LocalStorage from "@/clientlibs/LocalStorage";

type Props = {
    className?: string;
    children: ReactNode;
};

const LOCALSTORAGE_GRAPHICS_KEY = "graphics";

const useGraphicsToggle = (): [
    boolean | null,
    (value: boolean | ((x: boolean) => boolean)) => void,
] => {
    const [graphicsEnabled, _setGraphicsEnabled] = useState<boolean | null>(
        null,
    );

    useEffect(() => {
        const newValue = LocalStorage.getKey<boolean>(LOCALSTORAGE_GRAPHICS_KEY) ?? true
        _setGraphicsEnabled(
            newValue,
        );
    }, []);

    const setGraphicsEnabled = (value: boolean | ((x: boolean) => boolean)) => {
        _setGraphicsEnabled((curr) => {
            const newValue =
                typeof value === "function" ? value(curr ?? false) : value;
            LocalStorage.setKey(LOCALSTORAGE_GRAPHICS_KEY, newValue);
            return newValue;
        });
    };

    return [graphicsEnabled, setGraphicsEnabled];
};

const DisableableHeaderCanvas = (props: Props) => {
    const [graphicsEnabled, setGraphicsEnabled] = useGraphicsToggle();

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
                {!graphicsEnabled || !allowedWidth ? (
                    backupContent
                ) : (
                    <>
                        <HeaderCanvas>{props.children}</HeaderCanvas>
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
                        onClick={() => setGraphicsEnabled((e) => !e)}
                        className={`absolute right-0 bottom-0 mb-4 mr-4 text-sm`}
                    >
                        {`${graphicsEnabled ? "Disable" : "Enable"} 3D Graphics`}
                    </SpecialButton>
                )}
            </div>
        </div>
    );
};

export default DisableableHeaderCanvas;
