"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.sass";

type Props = {
    text: string;
    href: string;
    mobile?: boolean;
    icon?: SVGRPropsType;
} & React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>;

export type NavLinkType = {
    text: string;
    href: string;
    icon?: SVGRPropsType;
};

const NavLink = (props: Props) => {
    const { text, href, mobile, icon, ...anchorProps } = props;

    const isMobile = mobile ?? false;
    const pathname = usePathname();

    return (
        <Link
            {...anchorProps}
            href={href}
            title={text}
            className={`${styles.navLink}`}
            data-mobile={isMobile}
            data-curr-path={pathname === props.href}
        >
            {!props.icon ? null : (
                <props.icon className={`h-full w-auto object-contain`} />
            )}
            {/* Hide labels below xl so desktop tabs are icon-only; mobile panel keeps text */}
            {isMobile ? (
                text
            ) : (
                <span className="hidden xl:inline">{text}</span>
            )}
        </Link>
    );
};

export default NavLink;
