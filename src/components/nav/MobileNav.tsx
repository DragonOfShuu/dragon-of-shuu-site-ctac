"use client";

import { useState } from "react";
import LineIconButton from "../LineIconButton";
import NavLink, { NavLinkType } from "./NavLink";
import HamburgerMenuIcon from "@/assets/lineIcons/hamburgerMenu.svg";

type MobileNavPropType = {
    links: NavLinkType[]
}

const MobileNav = (props: MobileNavPropType) => {
    const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false)

    function menuIconClick() {
        setMobileNavVisible(!mobileNavVisible)
    }

    return (
        <>
            <LineIconButton
                svg={HamburgerMenuIcon}
                className={`w-14`}
                onClick={menuIconClick}
            />
            <div className={`${mobileNavVisible?`absolute`:`hidden`} inset-0 backdrop-blur-md`}>
                <div className="size-full flex flex-col items-start p-2">
                    {
                        props.links.map((l) => (
                            <NavLink href={l.href} text={l.name} key={l.name} mobile={true} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default MobileNav;
