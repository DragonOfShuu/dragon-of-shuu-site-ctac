"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.sass";
import LineIconButton from "@/components/LineIconButton";

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
            className={`${styles.navLink}`}
            data-mobile={isMobile}
            data-curr-path={pathname === props.href}
        >
            {!props.icon ? null : (
                <LineIconButton
                    svg={props.icon}
                    className={`h-full w-auto`}
                    iconClassName={``}
                />
            )}
            {text}
        </Link>
    );
};

export default NavLink;
