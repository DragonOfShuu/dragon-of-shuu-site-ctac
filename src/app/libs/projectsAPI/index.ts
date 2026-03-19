"use server";

import sql from "@/app/libs/sql";
import { ProjectType } from "@/app/libs/projectsAPI/types";
import {
    getAllInternal,
    imageLocation,
    minisDir,
    projectMetaFileName,
    rawToProcessed,
    searchInternalProjects,
} from "@/app/libs/projectsAPI/internals";
import { getDatabaseProjects } from "./externals";

// const extrasToProcessed = () => {
//     const imageIsEmpty = (data: ProjectType["image"]) =>
//         !data.src || !data.width || !data.height;

//     return Object.entries(extraProjects).reduce<{
//         [name: string]: ProjectType;
//     }>((prev, [name, projectData]) => {
//         const newProjectData: ProjectType = {
//             ...projectData,
//             image: {
//                 ...projectData.image,
//                 src: imageIsEmpty(projectData.image)
//                     ? undefined
//                     : imageLocation + projectData.image.src,
//             },
//         };
//         return { ...prev, [name]: newProjectData };
//     }, {});
// };

// const processedExtras = extrasToProcessed();

/**
 * Get projects from the database, paginated. Will also
 * include projects that are not in the database, but are
 * in the file system.
 * @param page 1-based index of the page we are needing
 * @returns A list of projects, paginated
 */
const getProjects = async (page: number): Promise<ProjectType[]> => {
    const pageSize = 10;
    const internalProjects = await getAllInternal();
    // TODO: PLACEHOLDER
    if (pageSize * page <= internalProjects.length)
        return internalProjects.slice((page - 1) * pageSize, pageSize);

    // Get start and end indices for slicing the database projects
    const preDbStartIndex = pageSize * (page - 1) - internalProjects.length;
    const dbStartIndex = Math.max(0, preDbStartIndex);
    const dbEndIndex = preDbStartIndex + pageSize;
    const databaseProjects = await getDatabaseProjects(
        dbStartIndex,
        dbEndIndex - dbStartIndex,
    );
    return [...internalProjects, ...databaseProjects];
};

const searchProjects = async (
    searchString: string,
    tags?: string[],
): Promise<ProjectType[]> => {
    const matchedInternal = await searchInternalProjects(searchString, tags);
    // TODO: PLACEHOLDER
    return matchedInternal;
};

const getAllTags = async (): Promise<string[]> => {
    const rows = await sql`SELECT name FROM tags`;
    return rows.map((row) => row.name);
};

export default getProjects;
export { searchProjects, getAllTags };
