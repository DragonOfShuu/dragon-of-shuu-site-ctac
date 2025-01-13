"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./ProjectItem.module.sass";
import Markdown from "react-markdown";
import {
    ImageDataType as ProjectImageType,
    ProjectType,
} from "@/app/libs/projectsAPI";
import GitHubIcon from '@/assets/lineIcons/socials/GitHub.svg'
import ExternalLinkIcon from '@/assets/lineIcons/externalLink.svg'
import Viewable3dDiv from "@/components/effects/Viewable3dDiv";

type ProjectDisplayPropType = {
    tagColorsTable: { [tagName: string]: [number, number, number] };
} & ProjectType;

const ProjectItem = (props: ProjectDisplayPropType) => {
    const [open, setOpen] = useState(false);

    return (
        <Viewable3dDiv maxTurn={5}>
            <div className={`${styles.item}`} onClick={() => setOpen((o) => !o)}>
                <h1 className={`text-3xl ${styles.text}`}>{props.name}</h1>
                <div className={`flex gap-1 justify-center md:justify-start flex-wrap`}>
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
                <Markdown className={`${open ? `block` : `hidden`} ${styles.text}`}>
                    {props.description}
                </Markdown>
                <div className={`${styles.interactables}`}>
                    <AdaptiveLink href={props.href} text={"Open"} />
                    {
                        !props.extraLinks ? <></> : 
                            Object.entries(props.extraLinks).map(([name, link]) => (
                                <AdaptiveLink href={link} text={name} key={name} />
                            ))
                    }
                </div>

                {/* Background elements */}
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
        </Viewable3dDiv>
    );
};

const AdaptiveLink = (props: {text: string, href: string}) => {
    const isLocal = props.href.startsWith('/');
    const isGithub = props.href.startsWith('https://github.com')

    let icon = null;

    if (!isLocal) {
        icon = <ExternalLinkIcon className={`h-6 w-auto fill-white`} />
    }

    if (isGithub) {
        icon = (
            <GitHubIcon className={`h-6 w-auto fill-white`} />
        )
    }

    return (
        <Link href={props.href} target={isLocal ? `_self` : `_blank`} className={`special-button shadow-md shadow-gray-900/50 flex gap-2`}>
            {props.text}
            {icon}
        </Link>
    )
}

export default ProjectItem;
