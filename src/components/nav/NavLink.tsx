"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.sass";

type Props = {
    text: string;
    href: string;
    mobile?: boolean;
};

const NavLink = (props: Props) => {
    const isMobile = props.mobile ?? false;
    const pathname = usePathname();

    return (
        <div
            className={`${styles.navLink}`}
            data-mobile={isMobile}
            data-curr-path={pathname === props.href}
        >
            <Link href={props.href} className={``}>
                {props.text}
            </Link>
        </div>
    );
};

export default NavLink;
