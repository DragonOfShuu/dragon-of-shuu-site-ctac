"use client"

import { ReactNode, useReducer } from "react";
import SettingsContext, { defaultSettings, settingsReducer } from "./SettingsContext";


const SettingsContextComp = (props: {children: ReactNode}) => {
    const [settings, settingsDispatch] = useReducer(settingsReducer, {...defaultSettings})

    return (
        <SettingsContext.Provider value={{sData: settings, sDispatch: settingsDispatch}}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextComp;