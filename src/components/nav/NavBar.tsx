"use client";

import Link from "next/link";
import NavLink, { NavLinkType } from "./NavLink";
import LineIconButton from "../LineIconButton";
import HamburgerMenuIcon from "@/assets/lineIcons/hamburgerMenu.svg";
import { useEffect, useState } from "react";
import useWindowDimensions, {
    aboveMd,
} from "@/components/hooks/useWindowDimensions";
import houseIcon from "@/assets/lineIcons/houseIcon.svg";
import mailIcon from "@/assets/lineIcons/mailIcon.svg";

type Props = {};

const useMobileNavOnlySmall = () => {
    const { width } = useWindowDimensions();
    const [mobileNavVis, setMobileNavVis] = useState<boolean>(false);

    useEffect(() => {
        if (!mobileNavVis) return;

        if (!aboveMd(width)) return;

        setMobileNavVis(false);
    }, [width, mobileNavVis]);

    return { mobileNavVis, setMobileNavVis };
};

const NavBar = (props: Props) => {
    const navLinks: NavLinkType[] = [
        {
            text: "Home",
            href: "/",
            icon: houseIcon,
        },
        {
            text: "Contact Us",
            href: "/contact",
            icon: mailIcon,
        },
    ];

    const { mobileNavVis, setMobileNavVis } = useMobileNavOnlySmall();

    function menuIconClick() {
        setMobileNavVis(!mobileNavVis);
    }

    const navClicked = () => {
        setTimeout(() => setMobileNavVis(false), 1000);
    };

    return (
        <nav
            className={`fixed inset-0 z-50 ${mobileNavVis ? `backdrop-blur-md pointer-events-auto` : `pointer-events-none`}`}
        >
            <div
                className={`flex items-center lg:grid grid-flow-col lg:grid-cols-3 px-3 py-2 h-18 pointer-events-auto`}
            >
                <h1
                    className={`text-xl sm:text-3xl text-amber-500 text-glow shadow-amber-500`}
                >
                    <Link href={`/`}>Dragon of Shuu</Link>
                </h1>

                <div
                    className={`ml-4 gap-2 hidden md:flex justify-end lg:justify-center flex-grow`}
                >
                    {navLinks.map((l) => (
                        <NavLink {...l} mobile={false} key={l.text} />
                    ))}
                </div>

                <div className={`md:hidden flex justify-end h-full flex-grow`}>
                    <LineIconButton
                        svg={HamburgerMenuIcon}
                        className={`w-14`}
                        onClick={menuIconClick}
                    />
                </div>
            </div>
            <div
                className={`pointer-events-auto ${mobileNavVis ? `flex` : `hidden`} flex-col p-2 items-start`}
            >
                {navLinks.map((l) => (
                    <NavLink
                        {...l}
                        mobile={true}
                        key={l.text}
                        onClick={navClicked}
                    />
                ))}
            </div>
        </nav>
    );
};

export default NavBar;
