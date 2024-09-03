import { createContext, useContext } from "react";
import { SettingsType } from "../CommonTypes";

export const defaultSettings: SettingsType = {
    canPerformDiagonals: true,
    heuristicMultiplier: 2,
    normalizeDirection: false,
    algoSpeed: 25,
    pathRevealSpeed: 1000
}

export type SettingsDispatchActions = 
    | { type: 'update', data: Partial<SettingsType> }
    | { type: 'reset' }
    | { type: 'u' } & Partial<SettingsType>

export type SettingsContextType = {
    sData: SettingsType,
    sDispatch: React.Dispatch<SettingsDispatchActions>
}

const SettingsContext = createContext<SettingsContextType|null>(null)

export const useSettings = () => {
    return useContext(SettingsContext) as SettingsContextType
}

export const settingsReducer = (oldState: SettingsType, action: SettingsDispatchActions): SettingsType => {
    switch (action.type) {
        case 'update': {
            return {...oldState, ...action.data}
        }
        case 'reset': {
            return {...defaultSettings}
        }
        case 'u': {
            const {type: _, ...changes} = action;
            return {...oldState, ...changes}
        }
    }
}

export default SettingsContext;
