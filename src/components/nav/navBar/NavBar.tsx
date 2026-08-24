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
import { ReactNode } from "react";

// Navbar component provides responsive navigation with:
// - Desktop: horizontal nav links + Sign In button on right
// - Mobile: hamburger menu + optional Sign In button
// - Auto-hide on scroll + manual collapse/expand

// NavBar component props
type Props = {
    /** Server-rendered login button passed as a slot to keep auth server-side */
    loginButton: ReactNode;
};

// Hook to manage mobile nav visibility - closes nav when screen resizes above md breakpoint
const useMobileNavOnlySmall = () => {
    const { width } = useWindowDimensions();
    const [mobileNavVis, setMobileNavVis] = useState<boolean>(false);

    useEffect(() => {
        if (!mobileNavVis) return;

        if (!aboveMd(width)) return;

        // Close mobile nav when viewport goes above md breakpoint
        setMobileNavVis(false);
    }, [width, mobileNavVis]);

    return { mobileNavVis, setMobileNavVis };
};

// Main navbar component - responsive design with desktop and mobile layouts
const NavBar = ({ loginButton }: Props) => {
    // Main navigation links that appear in desktop nav and mobile menu
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

    // Mobile nav state management
    const { mobileNavVis, setMobileNavVis } = useMobileNavOnlySmall();
    // Track scroll position for navbar background effect
    const { scrollY } = useWindowScroll();
    // Global navbar visibility state (for show/hide toggle)
    const { navBarData, setNavBarData } = useNavBar();

    // Toggle mobile nav visibility when hamburger is clicked
    function menuIconClick() {
        setMobileNavVis(!mobileNavVis);
    }

    // Close mobile nav when a link is clicked, with slight delay for animation
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
                {/* Main navbar header - contains logo, desktop nav, and Sign In button */}
                <div
                    className={`flex items-center lg:grid grid-flow-col lg:grid-cols-[25%_50%_25%] px-3 md:py-2 h-nav-margin ${scrollY > 0 && !mobileNavVis ? `bg-orange-975 bg-opacity-80 backdrop-blur-md` : ``} transition-colors`}
                >
                    {/* Logo/Branding - Left section */}
                    <Link
                        href={`/`}
                        className={`text-lg sm:text-3xl text-amber-500 text-glow shadow-amber-500 text-nowrap`}
                    >
                        Dragon of Shuu
                    </Link>

                    {/* Desktop navigation links - Center section (hidden on mobile) */}
                    <div
                        className={`ml-4 gap-2 hidden md:flex justify-end lg:justify-center flex-grow`}
                    >
                        {navLinks.map((l) => (
                            <NavLink {...l} mobile={false} key={l.text} />
                        ))}
                    </div>

                    {/* Desktop login button - Right section (only on md+ screens) */}
                    <div
                        className={`hidden md:flex justify-end items-center gap-2`}
                    >
                        {loginButton}
                    </div>

                    {/* Mobile hamburger menu - Right section (only on mobile) */}
                    <div
                        className={`md:hidden flex justify-end h-full flex-grow gap-2 items-center`}
                    >
                        {/* Mobile login button */}
                        {loginButton}
                        {/* Hamburger menu icon to toggle mobile nav */}
                        <LineIconButton
                            svg={HamburgerMenuIcon}
                            className={`w-14`}
                            onClick={menuIconClick}
                        />
                    </div>
                </div>
                {/* Collapse/Expand button - appears when nav is hidden */}
                <button
                    className={`${navBarData.isVisible || mobileNavVis ? `hidden` : `block`} rounded-b-lg w-12 py-2 ml-auto mr-4 bg-orange-950 flex items-center justify-center`}
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
            {/* Mobile navigation menu - slides in from right when hamburger is clicked */}
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
