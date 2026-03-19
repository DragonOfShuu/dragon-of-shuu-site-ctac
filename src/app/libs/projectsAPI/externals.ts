"use server";

import sql from "../sql";
import { ProjectType } from "./types";
import { imageLocation } from "./internals";

export const getDatabaseProjects = async (
    startIndex: number,
    pageSize: number,
): Promise<ProjectType[]> => {
    type IntermittentImageDataType = {
        image_src: string;
        image_alt_text: string;
        image_width: number;
        image_height: number;
    };
    type ImagelessProjectType = Omit<ProjectType, "image">;
    const projects = await sql<
        ImagelessProjectType & IntermittentImageDataType
    >`
        SELECT p.id, p.name, p.description, p.href, p.extra_links, p.created_at,
               i.filename AS image_src, i.alt_text AS image_alt_text, i.width AS image_width, i.height AS image_height
        FROM projects p
        LEFT OUTER JOIN images i ON p.image_id = i.id
        ORDER BY p.created_at DESC
        LIMIT ${pageSize} OFFSET ${startIndex}
    `;
    console.log({ projects });
    const newProjects = projects.map((project) => {
        const {
            image_src,
            image_alt_text,
            image_width,
            image_height,
            ...projData
        } = project;
        return {
            ...projData,
            image: {
                src: imageLocation + image_src,
                alt_text: image_alt_text,
                width: image_width,
                height: image_height,
            },
        };
    });
    return newProjects;
};
