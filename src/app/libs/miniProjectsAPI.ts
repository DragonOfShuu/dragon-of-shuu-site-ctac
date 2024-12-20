"use server";

import { readdir } from "fs/promises";
import fs from "fs/promises";
import matter from "gray-matter";
import { join } from "path";

const minisDir = "src/app/projects/";
const projectMetaFileName = "project.md";
const imageLocation = "/projects/image-bucket/";

type FrontMatterType = {
    name: string;
    image: string;
    width: number;
    height: number;
    /** Example: "website, typescript, text translation" */
    tags?: string;
};

export type ImageDataType = {
    src: string;
    width: number;
    height: number;
};

export type ProjectType = {
    name: string;
    href: string;
    image: Partial<ImageDataType>;
    description: string;
    tags?: string[];
};

const getProjectNames = async () => {
    const folders = (await readdir(minisDir, { withFileTypes: true }))
        .filter((file) => file.isDirectory())
        .map((file) => file.name);
    return folders;
};

const rawToProcessed = (matter: FrontMatterType, content: string, dirName: string): ProjectType => {
    const imageData: Partial<ImageDataType> = {
        height: matter.height || undefined,
        width: matter.width || undefined,
        src: join(imageLocation ?? "", matter.image ?? "").replace(
            /\\/g,
            "/",
        ),
    };

    return {
        description: content,
        href: `/projects/${dirName}`,
        image: imageData,
        name: matter.name,
        tags: matter.tags === undefined ? [] : matter.tags.split(',').map((v) => v.trim())
    }
}

const getProjectData = async (
    projName: string,
): Promise<ProjectType | null> => {
    const fullPath = join(minisDir, projName, projectMetaFileName);

    let fileContent;
    try {
        fileContent = await fs.readFile(fullPath, "utf8");
    } catch {
        return null;
    }

    const { data: frontmatter, content } = matter(fileContent);

    return rawToProcessed(frontmatter as FrontMatterType, content, projName)
};

const getAllProjects = async (): Promise<ProjectType[]> => {
    const projNames = await getProjectNames();

    const projData = await Promise.all(projNames.map((p) => getProjectData(p)));

    return projData.filter((p) => p !== null);
};

export default getAllProjects;
export { getProjectData, getProjectNames };
