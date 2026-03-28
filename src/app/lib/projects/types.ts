export type FrontMatterType = {
    name: string;
    image: string;
    width: number;
    height: number;
    /** Example: "website, typescript, text translation" */
    tags?: string;
};

export type ImageDataType = {
    src: string;
    alt_text: string;
    width: number;
    height: number;
};

export type ProjectType = {
    id: number;
    name: string;
    description: string;
    href: string;
    extra_links?: { [name: string]: string };
    image?: ImageDataType;
    created_at?: Date;
    tags?: string[];
};

export default {};
