"use client";

import SpecialButton from "@/components/SpecialButton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./ProjectItem.module.sass";
import Markdown from "react-markdown";
import {
    ImageDataType as ProjectImageType,
    ProjectType,
} from "@/app/libs/projectsAPI";

type ProjectDisplayPropType = {
    tagColorsTable: { [tagName: string]: [number, number, number] };
} & ProjectType;

const ProjectItem = (props: ProjectDisplayPropType) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={`${styles.item}`} onClick={() => setOpen((o) => !o)}>
            <div className={`${styles.text}`}>
                <h1>{props.name}</h1>
                <div className={`flex gap-1 justify-center md:justify-start`}>
                    {props.tags?.sort().map((tagName) => {
                        const colors = props.tagColorsTable[tagName] ?? [
                            180, 180, 180,
                        ];
                        const colorString = colors.join(", ");
                        return (
                            <div
                                className={`${styles.tag}`}
                                style={{
                                    backgroundColor: `rgb(${colorString})`,
                                }}
                                key={tagName}
                            >
                                {tagName}
                            </div>
                        );
                    })}
                </div>
                <Markdown className={`${open ? `block` : `hidden`}`}>
                    {props.description}
                </Markdown>
            </div>
            <div className={`${styles.interactables}`}>
                <Link href={props.href} target={props.href.startsWith('/') ? `_self` : `_blank`}>
                    <SpecialButton className={`shadow-md shadow-gray-900/50`}>
                        Open
                    </SpecialButton>
                </Link>
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-950 via-orange-900 via-40%" />
            {props.image.height && props.image.width ? (
                <div className="absolute inset-0 -z-20">
                    <Image
                        {...(props.image as ProjectImageType)}
                        alt={`${props.name} background image`}
                        className={`object-cover object-center h-full w-3/4 float-right`}
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ProjectItem;
