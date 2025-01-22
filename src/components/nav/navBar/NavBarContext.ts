"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";

export type NavBarContextDataType = {
    isVisible: boolean
    hiddenReasons: string[]
    forceVisible: boolean
}

export type NavBarContextActionType = 
    | { type: 'visibility', visible: boolean, reasonKey: string }
    | { type: 'resetVisibility' }
    | { type: 'setForceVisible', visible: boolean }

export type NavBarContextType = {
    navBarData: NavBarContextDataType,
    setNavBarData: React.Dispatch<NavBarContextActionType>
}

const NavBarContext = createContext<NavBarContextType|null>(null)

const useNavBar = () => {
    return useContext(NavBarContext) as NavBarContextType;
}

const useNavBarInit = () => {
    const [navBarData, setNavBarData] = useReducer(NavBarDataReducer, { isVisible: true, hiddenReasons: [], forceVisible: false })
    const pathname = usePathname();

    useEffect(() => {
        setNavBarData({ type: 'resetVisibility' })
    }, [pathname])

    return {navBarData, setNavBarData}
}

const NavBarDataReducer = (prevState: NavBarContextDataType, action: NavBarContextActionType): NavBarContextDataType => {
    switch (action.type) {
        case 'visibility': {
            const newState = {...prevState}

            if (action.visible) {
                newState.hiddenReasons = newState.hiddenReasons.filter((str) => str!==action.reasonKey)
            } else {
                // Anti-pattern. Will prob remove later
                // [nested if statement]
                if (!newState.hiddenReasons.includes(action.reasonKey)) {
                    newState.hiddenReasons = [...newState.hiddenReasons, action.reasonKey]
                }
            }

            return {...newState, isVisible: newState.hiddenReasons.length===0 }
        }
        case 'resetVisibility': {
            return {...prevState, isVisible: true, hiddenReasons: [], forceVisible: false}
        }
        case 'setForceVisible': {
            return {...prevState, forceVisible: action.visible}
        }
    }
}

export { NavBarContext, useNavBarInit };
export default useNavBar;
