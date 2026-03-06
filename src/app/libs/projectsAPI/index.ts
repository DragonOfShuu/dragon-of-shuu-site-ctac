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

const getProjects = async (
    page: number,
    pageSize: number,
): Promise<ProjectType[]> => {
    // TODO: PLACEHOLDER
    return await getAllInternal();
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
