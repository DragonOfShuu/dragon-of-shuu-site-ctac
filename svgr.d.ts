declare module "*.svg" {
    import { FC, SVGProps } from "react";
    const content: SVGRPropsType;
    export default content;
}

declare module "*.svg?url" {
    const content: any;
    export default content;
}

declare type SVGRPropsType = FC<SVGProps<SVGElement>>;