"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.sass";

type Props = {
    text: string;
    href: string;
    mobile?: boolean;
} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export type NavLinkType = {
    name: string;
    href: string;
};

const NavLink = (props: Props) => {
    const {text, href, mobile, ...anchorProps} = props;

    const isMobile = mobile ?? false;
    const pathname = usePathname();

    return (
        <Link {...anchorProps} href={href} className={`${styles.navLink}`} data-mobile={isMobile} data-curr-path={pathname === props.href}>
            {text}
        </Link>
    );
};

export default NavLink;
