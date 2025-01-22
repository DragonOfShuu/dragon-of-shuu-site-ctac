"use client";

import Link from "next/link";
import NavLink, { NavLinkType } from "./NavLink";
import LineIconButton from "../../LineIconButton";
import HamburgerMenuIcon from "@/assets/lineIcons/hamburgerMenu.svg";
import ProjectIcon from "@/assets/lineIcons/projectIcon.svg";
import { useEffect, useState } from "react";
import useWindowDimensions, {
    aboveMd,
} from "@/components/hooks/useWindowDimensions";
import houseIcon from "@/assets/lineIcons/houseIcon.svg";
import mailIcon from "@/assets/lineIcons/mailIcon.svg";
import iIcon from "@/assets/lineIcons/iIcon.svg";
import useWindowScroll from "@/components/hooks/useWindowScroll";
import styles from "./NavBar.module.sass";
import useNavBar from "@/components/nav/navBar/NavBarContext";

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
            text: "About Me",
            href: "/about",
            icon: iIcon,
        },
        {
            text: "Contact Us",
            href: "/contact",
            icon: mailIcon,
        },
        {
            text: "Projects",
            href: "/projects",
            icon: ProjectIcon,
        },
    ];

    const { mobileNavVis, setMobileNavVis } = useMobileNavOnlySmall();
    const { scrollY } = useWindowScroll();
    const { navBarData, setNavBarData } = useNavBar();

    function menuIconClick() {
        setMobileNavVis(!mobileNavVis);
    }

    const navClicked = () => {
        setTimeout(() => setMobileNavVis(false), 500);
    };

    return (
        <nav
            className={`${styles.navBar}`}
            data-mobile-vis={mobileNavVis}
            data-visible={navBarData.forceVisible ? true : navBarData.isVisible}
        >
            <div className={`pointer-events-auto`}>
                <div
                    className={`flex items-center lg:grid grid-flow-col lg:grid-cols-[25%_50%_25%] px-3 md:py-2 h-nav-margin ${scrollY > 0 && !mobileNavVis ? `bg-orange-975 bg-opacity-80 backdrop-blur-md` : ``} transition-colors`}
                >
                    <Link
                        href={`/`}
                        className={`text-lg sm:text-3xl text-amber-500 text-glow shadow-amber-500 text-nowrap`}
                    >
                        Dragon of Shuu
                    </Link>

                    <div
                        className={`ml-4 gap-2 hidden md:flex justify-end lg:justify-center flex-grow`}
                    >
                        {navLinks.map((l) => (
                            <NavLink {...l} mobile={false} key={l.text} />
                        ))}
                    </div>

                    <div
                        className={`md:hidden flex justify-end h-full flex-grow`}
                    >
                        <LineIconButton
                            svg={HamburgerMenuIcon}
                            className={`w-14`}
                            onClick={menuIconClick}
                        />
                    </div>
                </div>
                <div
                    className={`${navBarData.isVisible || mobileNavVis ? `hidden` : `block`} rounded-b-lg w-12 py-2 ml-auto mr-4 bg-orange-950 flex items-center justify-center`}
                >
                    <button
                        onClick={() =>
                            setNavBarData({
                                type: "setForceVisible",
                                visible: !navBarData.forceVisible,
                            })
                        }
                    >
                        <span
                            className={`${navBarData.forceVisible ? "rotate-0" : "rotate-180"} transition-all block`}
                        >
                            &#9650;
                        </span>
                    </button>
                </div>
            </div>
            <div
                className={`${styles.mobileLinkList}`}
                data-mobile-vis={mobileNavVis}
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
