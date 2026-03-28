"use server";

import sql from "../sql";
import { ProjectType } from "../../lib/projects/types";
import { imageLocation } from "../../lib/projects/constants";
import { cacheLife } from "next/cache";

const pullProjectsQuery = sql`
        SELECT p.id, p.name, p.description, p.href, p.extra_links, p.created_at, ARRAY(
                    SELECT t.name FROM project_tags pt 
                    LEFT JOIN tags t ON pt.tag_id = t.id 
                    WHERE p.id = pt.project_id
            ) AS tags, (
                SELECT row_to_json(i) FROM (
                    SELECT (${imageLocation} || filename) as src, alt_text, width, height 
                    FROM images i WHERE i.id = p.image_id LIMIT 1 -- Just in case 
                ) i
            ) AS image
        FROM projects p
        ORDER BY p.created_at DESC`;

export const getDatabaseProjects = async (
    startIndex: number,
    pageSize: number,
): Promise<ProjectType[]> => {
    return searchDatabaseProjects(startIndex, pageSize, "", []);
};

export const searchDatabaseProjects = async (
    startIndex: number,
    pageSize: number,
    searchString: string,
    tags?: string[],
): Promise<ProjectType[]> => {
    "use cache";
    cacheLife("hours");
    const keywords = searchString
        .toLowerCase()
        .split(" ")
        .filter((kw) => kw.trim() !== "");
    const searchPattern = keywords.join("|").trim();
    const searchTags = tags && tags.length > 0 ? tags : [];
    const projects: ProjectType[] = await sql`
        SELECT * FROM (${pullProjectsQuery})
        WHERE (lower(name || description) ~* ${searchPattern})
            AND (
                tags @> ${searchTags}
            )
        LIMIT ${pageSize} OFFSET ${startIndex}
    `;
    return projects;
};
