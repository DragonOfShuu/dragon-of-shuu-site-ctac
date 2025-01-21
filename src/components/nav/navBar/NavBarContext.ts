"use client";

import { createContext, useContext, useReducer } from "react";

export type NavBarContextDataType = {
    isVisible: boolean
    hiddenReasons: string[]
}

export type NavBarContextActionType = 
    | { type: 'visibility', visible: boolean, reasonKey: string }

export type NavBarContextType = {
    navBarData: NavBarContextDataType,
    setNavBarData: React.Dispatch<NavBarContextActionType>
}

const NavBarContext = createContext<NavBarContextType|null>(null)

const useNavBar = () => {
    return useContext(NavBarContext) as NavBarContextType;
}

const useNavBarInit = () => {
    const [navBarData, setNavBarData] = useReducer(NavBarDataReducer, { isVisible: true, hiddenReasons: [] })

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
    }
}

export { NavBarContext, useNavBarInit };
export default useNavBar;
