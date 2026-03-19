// "use server";

import {
    FrontMatterType,
    ProjectType,
    ImageDataType,
} from "@/app/libs/projectsAPI/types";
import { join } from "path/posix";
import fs from "fs/promises";
import matter from "gray-matter";
import { readdir } from "fs/promises";
import sql from "@/app/libs/sql";

export const minisDir = "src/app/projects/";
export const projectMetaFileName = "project.md";
export const imageLocation = "/projects/image-bucket/";

export const rawToProcessed = (
    matter: FrontMatterType,
    content: string,
    dirName: string,
    id: number,
): ProjectType => {
    const imageData: Partial<ImageDataType> = {
        height: matter.height || undefined,
        width: matter.width || undefined,
        src: join(imageLocation ?? "", matter.image ?? "").replace(/\\/g, "/"),
    };

    return {
        id,
        name: matter.name,
        description: content,
        href: `/projects/${dirName}`,
        image: imageData,
        tags:
            matter.tags === undefined
                ? []
                : matter.tags.split(",").map((v) => v.trim()),
    };
};

const getProjectNames = async () => {
    const folders = (
        await readdir(`${process.cwd()}/${minisDir}`, { withFileTypes: true })
    )
        .filter((file) => file.isDirectory())
        .map((file) => file.name);
    return [...folders];
};

const getProjectData = async (
    projName: string,
    id: number,
): Promise<ProjectType | null> => {
    const fullPath = join(
        `${process.cwd()}/${minisDir}`,
        projName,
        projectMetaFileName,
    );

    let fileContent;
    try {
        fileContent = await fs.readFile(fullPath, "utf8");
    } catch {
        return null;
    }

    const { data: frontmatter, content } = matter(fileContent);

    return rawToProcessed(
        frontmatter as FrontMatterType,
        content,
        projName,
        id,
    );
};

export const getAllInternal = async () => {
    const projNames = await getProjectNames();
    const projData = await Promise.all(
        projNames.map((p, index) => getProjectData(p, -index - 1)),
    );
    const projs = projData.filter((p) => p !== null) as ProjectType[];
    return projs;
};

export const searchInternalProjects = async (
    searchString: string,
    tags?: string[],
): Promise<ProjectType[]> => {
    const projs = await getAllInternal();
    return projs.filter((project) => {
        const thisProjectTags = project.tags;
        const searchStringParts = searchString.split(/\W+/);
        // console.table({ searchStringParts, tags });
        // If the search string could not be found, filter this project out
        if (
            searchString !== "" &&
            searchStringParts.some(
                (part) =>
                    !project.name.toLowerCase().includes(part.toLowerCase()),
            )
        )
            return false;
        // If tags are required, but this project doesn't have tags, filter this project out
        if (tags && tags.length > 0 && !thisProjectTags) return false;
        // If there are any missing tags, filter this project out
        if (
            tags &&
            thisProjectTags &&
            tags.some((t) => !thisProjectTags.includes(t))
        )
            return false;
        // Return true otherwise
        return true;
    });
};
