import { ReactNode } from "react";
import Instagram from "@/assets/lineIcons/socials/Instagram.svg";
import Github from "@/assets/lineIcons/socials/GitHub.svg";
import Youtube from "@/assets/lineIcons/socials/Youtube.svg";
import LinkedIn from "@/assets/lineIcons/socials/LinkedIn.svg";

type SocialPlatData = {
    link: string;
    icon: SVGRPropsType;
};

const socialMedia: { [socialMediaName: string]: SocialPlatData } = {
    instagram: {
        link: "https://www.instagram.com/logan.of.shuu/",
        icon: Instagram,
    },
    linkedIn: {
        link: "https://www.linkedin.com/in/logan-cederlof-583780278/",
        icon: LinkedIn,
    },
    github: {
        link: "https://github.com/DragonOfShuu",
        icon: Github,
    },
    youTube: {
        link: "https://www.youtube.com/channel/UCS_yroI1u7UgWtP3qgQXEyA",
        icon: Youtube,
    },
};

export default socialMedia;
