"use client";

import SpecialButton from "@/components/SpecialButton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from './ProjectItem.module.sass'

export type imageDataType = {
    src: string;
    width: number;
    height: number;
};

export type ProjectDisplayPropType = {
    name: string;
    href: string;
    image: imageDataType;
    description: string;
};

const ProjectItem = (props: ProjectDisplayPropType) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles.item}`}
            onClick={() => setOpen((o)=>!o)}
        >
            <div className={`${styles.text}`}>
                <h1>{props.name}</h1>
                <p className={`${open?`block`:`hidden`}`}>
                    {props.description}
                </p>
            </div>
            <div className={`${styles.interactables}`}>
                <SpecialButton className={`shadow-md shadow-gray-900/50`}>
                    <Link href={props.href}>Open</Link>
                </SpecialButton>
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-950 via-orange-900 via-40%" />
            <div className="absolute inset-0 -z-20">
                <Image
                    src={props.image}
                    alt={`${props.name} background image`}
                    className={`object-cover object-center h-full w-3/4 float-right`}
                />
            </div>
        </div>
    );
};

export default ProjectItem;
