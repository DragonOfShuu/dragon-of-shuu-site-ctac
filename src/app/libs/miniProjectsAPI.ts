"use server";

import { readdir } from "fs/promises";
import fs from "fs/promises";
import matter from "gray-matter";
import { join } from "path";

const minisDir = "src/app/minis/";
const projectMetaFileName = "project.md";

type FrontMatterType = {
    name: string;
    image: string;
    width: number;
    height: number;
};

type MiniProjectType = {
    frontMatter: FrontMatterType;
    dirName: string;
    content: string;
};

const getProjectNames = async () => {
    const folders = (await readdir(minisDir, { withFileTypes: true }))
        .filter((file) => file.isDirectory())
        .map((file) => file.name);
    return folders;
};

const getProjectData = async (
    projName: string,
): Promise<MiniProjectType | null> => {
    const fullPath = join(minisDir, projName, projectMetaFileName);

    let fileContent;
    try {
        fileContent = await fs.readFile(fullPath, "utf8");
    } catch {
        return null;
    }

    const { data: frontmatter, content } = matter(fileContent);

    return {
        frontMatter: frontmatter as FrontMatterType,
        content: content,
        dirName: projName,
    };
};

const getAllProjects = async (): Promise<MiniProjectType[]> => {
    const projNames = await getProjectNames();

    const projData = await Promise.all(projNames.map((p) => getProjectData(p)));

    return projData.filter((p) => p !== null);
    // return new Promise((resolve) => setTimeout(resolve, 1000000)).then(() => projData.filter((p) => p !== null))
};

export default getAllProjects;
export { getProjectData, getProjectNames };
