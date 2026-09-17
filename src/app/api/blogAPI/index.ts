"use server";

import { auth } from "@/app/lib/auth/auth";
import sql from "@/app/api/sql";
import { BlogInputType, BlogType } from "@/app/lib/blog/types";

/**
 * Server actions for the dashboard blog section.
 *
 * Every function that touches the database is stubbed out: look for the
 * "SQL goes here" comments and drop in the queries. The assumed table
 * shape mirrors `BlogType` (blogs), with a column linking each post to
 * its author so we can scope everything to the logged-in user.
 */

/**
 * Get all blog posts written by the currently logged in user,
 * ordered most recently written first.
 */
const getBlogs = async (): Promise<BlogType[]> => {
    const session = await auth();
    if (!session?.user?.id) return [];

    // SQL goes here, it will perform: select all blog posts written by the current user (matched against the session's user id), ordered by date written descending
    const blogs: BlogType[] = [];
    return blogs;
};

/**
 * Get a single blog post by id (only if it belongs to the current user).
 */
const getBlogById = async (id: number): Promise<BlogType | null> => {
    const session = await auth();
    if (!session?.user?.id) return null;

    // SQL goes here, it will perform: select the single blog post with this id, only if it was written by the current user
    const blog: BlogType | null = null;
    return blog;
};

/**
 * Create a new blog post for the currently logged in user.
 * Returns the new post's id, or null if it could not be created.
 */
const createBlog = async (input: BlogInputType): Promise<number | null> => {
    const session = await auth();
    if (!session?.user?.id) return null;

    // SQL goes here, it will perform: insert a new blog post for the current user with the given title, image, description and content, stamping date written as now (and date edited as null), then return the generated id of the new row
    const newId: number | null = null;
    return newId;
};

/**
 * Update an existing blog post and stamp its date edited.
 */
const updateBlog = async (
    id: number,
    input: BlogInputType,
): Promise<boolean> => {
    const session = await auth();
    if (!session?.user?.id) return false;

    // SQL goes here, it will perform: update the blog post with this id (only if it was written by the current user), setting its title, image, description and content to the new values and stamping date edited as now
    const success = false;
    return success;
};

/**
 * Delete the given blog posts (only if they belong to the current user).
 */
const deleteBlogs = async (ids: number[]): Promise<void> => {
    if (ids.length === 0) return;

    const session = await auth();
    if (!session?.user?.id) return;

    // SQL goes here, it will perform: delete all blog posts with the given ids, only if they were written by the current user
};

export default getBlogs;
export { getBlogById, createBlog, updateBlog, deleteBlogs };
