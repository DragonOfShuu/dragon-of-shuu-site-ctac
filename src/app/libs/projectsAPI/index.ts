"use server";

import { readdir } from "fs/promises";
import fs from "fs/promises";
import matter from "gray-matter";
import { join } from "path";

import extraProjects from "@/app/libs/projectsAPI/extras";

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
    extraLinks?: {[name: string]: string};
    image: Partial<ImageDataType>;
    description: string;
    tags?: string[];
};

const getProjectNames = async () => {
    const folders = (await readdir(minisDir, { withFileTypes: true }))
        .filter((file) => file.isDirectory())
        .map((file) => file.name);
    return [...folders, ...Object.values(extraProjects).map((project) => project.name)];
};

const rawToProcessed = (
    matter: FrontMatterType,
    content: string,
    dirName: string,
): ProjectType => {
    const imageData: Partial<ImageDataType> = {
        height: matter.height || undefined,
        width: matter.width || undefined,
        src: join(imageLocation ?? "", matter.image ?? "").replace(/\\/g, "/"),
    };

    return {
        description: content,
        href: `/projects/${dirName}`,
        image: imageData,
        name: matter.name,
        tags:
            matter.tags === undefined
                ? []
                : matter.tags.split(",").map((v) => v.trim()),
    };
};

const getProjectData = async (
    projName: string,
): Promise<ProjectType | null> => {
    const fullPath = join(minisDir, projName, projectMetaFileName);

    let fileContent;
    try {
        fileContent = await fs.readFile(fullPath, "utf8");
    } catch {
        return extraProjects[projName] ?? null;
    }

    const { data: frontmatter, content } = matter(fileContent);

    return rawToProcessed(frontmatter as FrontMatterType, content, projName);
};

const getAllProjects = async (): Promise<ProjectType[]> => {
    const projNames = await getProjectNames();

    const projData = await Promise.all(projNames.map((p) => getProjectData(p)));

    return projData.filter((p) => p !== null);
};

const searchProjects = async (
    searchString: string,
    tags?: string[],
): Promise<ProjectType[]> => {
    const projs = await getAllProjects();
    const newProjs = projs.filter((project) => {
        const thisProjectTags = project.tags;
        const searchStringParts = searchString.split(/\W+/);
        console.table({ searchStringParts, tags });
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
    // FOR TESTING
    // return new Promise((resolve) => setTimeout(() => resolve(newProjs), 500));
    return newProjs;
};

const getAllTags = async (): Promise<string[]> => {
    const projects = await getAllProjects();

    return projects.reduce<string[]>((newTagList, project) => {
        const projectTags = project.tags;
        if (!projectTags) return newTagList;

        projectTags.forEach((newTag) => {
            if (newTagList.includes(newTag)) return;
            newTagList.push(newTag);
        });

        return newTagList;
    }, []);
};

export default getAllProjects;
export { getProjectData, getProjectNames, searchProjects, getAllTags };
