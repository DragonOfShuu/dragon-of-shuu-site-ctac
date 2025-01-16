"use client";

import {
    StaticImageData,
    StaticImport,
} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./ImageViewer.module.sass";

type ImageViewerPropType = Omit<
    JSX.IntrinsicElements["img"],
    "src" | "alt" | "width" | "height"
> & {
    src: string | StaticImport | StaticImageData;
    alt: string;
    width?: number;
    height?: number;
    innerImageClass?: string;
};

const ImageViewer = ({ ...imageProps }: ImageViewerPropType) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [scale, setScale] = useState<number>(0);

    const smallImageClickHandler = (
        event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    ): void => {
        dialogRef.current?.showModal();
        setScale(1);
    };

    const largeImageClickHandler = (
        event: React.MouseEvent<HTMLDialogElement, MouseEvent>,
    ): void => {
        if (event.target !== dialogRef.current) return;

        setScale(0);
        setTimeout(() => {
            dialogRef.current?.close();
        }, 250);
    };

    return (
        <>
            <Image
                {...imageProps}
                alt={imageProps.alt}
                className={`${imageProps.className ?? ""} cursor-pointer`}
                onClick={smallImageClickHandler}
            />
            <div className={`absolute`}>
                <dialog
                    ref={dialogRef}
                    className={`bg-transparent backdrop:blur-3xl backdrop:bg-black/50 transition-all outline-none`}
                    onClick={largeImageClickHandler}
                >
                    <Image
                        className={`${imageProps.innerImageClass ?? ""} ${styles.dialogImg}`}
                        style={{ transform: `scale(${scale})` }}
                        src={imageProps.src}
                        alt={imageProps.alt}
                        width={imageProps.width}
                        height={imageProps.height}
                    />
                </dialog>
            </div>
        </>
    );
};

export default ImageViewer;
