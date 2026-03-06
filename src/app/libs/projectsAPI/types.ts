export type FrontMatterType = {
    name: string;
    image: string;
    width: number;
    height: number;
    /** Example: "website, typescript, text translation" */
    tags?: string;
};

export type ImageDataType = {
    id: number | null; // null for projects that aren't in the database
    filename: string;
    alt_text: string;
    width: number;
    height: number;
};

export type rawProjectType = {
    id: number;
    name: string;
    description: string;
    href: string;
    extra_links?: { [name: string]: string };
    image_id: number;
    created_at: Date;
};

export type ProjectType = {
    id: number;
    name: string;
    description: string;
    href: string;
    extraLinks?: { [name: string]: string };
    image: Partial<ImageDataType>;
    created_at?: Date;
    tags?: string[];
};

export type TagType = {
    id: number;
    name: string;
    description: string;
};

export type ProjectTagType = {
    project_id: number;
    tag_id: number;
};

export default {};
