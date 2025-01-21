"use client";

import { NavBarContext, useNavBarInit } from "@/components/nav/navBar/NavBarContext";
import { ReactNode } from "react";

const NavBarProvider = ({ children }: { children: ReactNode }) => {
    const {navBarData, setNavBarData} = useNavBarInit()

    return (
        <NavBarContext.Provider value={{navBarData, setNavBarData}}>
            {children}
        </NavBarContext.Provider>
    )
}

export default NavBarProvider;
