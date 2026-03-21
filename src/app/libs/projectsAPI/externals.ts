"use server";

import sql from "../sql";
import { ProjectType } from "./types";
import { imageLocation } from "./internals";
import { cacheLife } from "next/cache";

export const getDatabaseProjects = async (
    startIndex: number,
    pageSize: number,
): Promise<ProjectType[]> => {
    "use cache";
    cacheLife("hours");
    // prettier-ignore
    const projects = await sql<ProjectType>`
        SELECT p.id, p.name, p.description, p.href, p.extra_links, p.created_at, ARRAY(
                    SELECT t.name FROM project_tags pt 
                    LEFT JOIN tags t ON pt.tag_id = t.id 
                    WHERE p.id = pt.project_id
            ) AS tags, (
                SELECT row_to_json(i) FROM (
                    SELECT (${imageLocation} || filename) as src, alt_text, width, height 
                    FROM images i WHERE i.id = p.image_id
                ) i
            ) AS image
        FROM projects p
        ORDER BY p.created_at DESC
        -- This is safe, as it is sanitized by neon and cannot be injected with SQL
        LIMIT ${pageSize} OFFSET ${startIndex}
    `;
    return projects;
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
    let searchPattern = keywords
        .map((kw) => `${kw}`)
        .join("|")
        .trim();
    const searchTags = tags && tags.length > 0 ? tags : [];
    const query = sql`
        SELECT * FROM (SELECT p.id, p.name, p.description, p.href, p.extra_links, p.created_at, ARRAY(
                        SELECT t.name FROM project_tags pt 
                        LEFT JOIN tags t ON pt.tag_id = t.id 
                        WHERE p.id = pt.project_id
                ) AS tags, (
                    SELECT row_to_json(i) FROM (
                        SELECT (${imageLocation} || filename) as src, alt_text, width, height 
                        FROM images i WHERE i.id = p.image_id
                    ) i
                ) AS image
            FROM projects p
            ORDER BY p.created_at DESC)
        WHERE (lower(name || description) ~* ${searchPattern})
            AND (
                tags @> ${searchTags}
            )
        LIMIT ${pageSize} OFFSET ${startIndex}
    `;
    const projects = await query;
    return projects;
};
