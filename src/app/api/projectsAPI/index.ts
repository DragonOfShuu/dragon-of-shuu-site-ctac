"use server";

import sql from "@/app/api/sql";
import { ProjectType } from "@/app/lib/projects/types";
import {
    getAllInternal,
    searchInternalProjects,
} from "@/app/api/projectsAPI/internals";
import { getDatabaseProjects, searchDatabaseProjects } from "./externals";

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

    const sectionedInternal = internalProjects.slice(
        (page - 1) * pageSize,
        pageSize,
    );
    if (pageSize * page <= internalProjects.length) return sectionedInternal;

    // Get start and end indices for slicing the database projects
    const preDbStartIndex = pageSize * (page - 1) - internalProjects.length;
    const dbStartIndex = Math.max(0, preDbStartIndex);
    const dbEndIndex = preDbStartIndex + pageSize;
    const databaseProjects = await getDatabaseProjects(
        dbStartIndex,
        dbEndIndex - dbStartIndex,
    );
    return [...sectionedInternal, ...databaseProjects];
};

const searchProjects = async (
    page: number,
    searchString: string,
    tags?: string[],
): Promise<ProjectType[]> => {
    const pageSize = 10;
    const matchedInternal = await searchInternalProjects(searchString, tags);

    const sectionedInternal = matchedInternal.slice(
        (page - 1) * pageSize,
        pageSize,
    );
    if (pageSize * page <= matchedInternal.length) return sectionedInternal;

    // Get start and end indices for slicing the database projects
    const preDbStartIndex = pageSize * (page - 1) - matchedInternal.length;
    const dbStartIndex = Math.max(0, preDbStartIndex);
    const dbEndIndex = preDbStartIndex + pageSize;
    const databaseProjects = await searchDatabaseProjects(
        dbStartIndex,
        dbEndIndex - dbStartIndex,
        searchString,
        tags,
    );

    return [...sectionedInternal, ...databaseProjects];
};

const getAllTags = async (): Promise<string[]> => {
    const rows = await sql`SELECT name FROM tags`;
    return rows.map((row) => row.name);
};

export default getProjects;
export { searchProjects, getAllTags };
