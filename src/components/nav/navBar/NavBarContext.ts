"use client";

import { createContext, useContext, useReducer } from "react";

type NavBarContextDataType = {
    isVisible: boolean
}

type NavBarContextActionType = 
    | { type: 'visibility', visible: boolean }

type NavBarContextType = {
    navBarData: NavBarContextDataType,
    setNavBarData: React.Dispatch<NavBarContextActionType>
}

const NavBarContext = createContext<NavBarContextType|null>(null)

const useNavBar = () => {
    return useContext(NavBarContext) as NavBarContextType;
}

const useNavBarInit = () => {
    const [navBarData, setNavBarData] = useReducer(NavBarDataReducer, { isVisible: true })

    return {navBarData, setNavBarData}
}

const NavBarDataReducer = (prevState: NavBarContextDataType, action: NavBarContextActionType): NavBarContextDataType => {
    switch (action.type) {
        case 'visibility': {
            return {...prevState, isVisible: action.visible }
        }
    }
}

export { NavBarContext, useNavBarInit };
export default useNavBar;
