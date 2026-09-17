/**
 * A blog post as stored in the database.
 * `image` is just the file name; the actual file lives at
 * `public/blog/image/<image>` and is served from `/blog/image/<image>`.
 */
export type BlogType = {
    id: number;
    title: string;
    image: string;
    /** When the post was first written */
    dateWritten: Date | string;
    description: string;
    /** Null if the post has never been edited */
    dateEdited: Date | string | null;
    /** The full markdown source of the post */
    content: string;
};

/** Fields a user can set when creating or editing a blog post. */
export type BlogInputType = {
    title: string;
    image: string;
    description: string;
    content: string;
};
