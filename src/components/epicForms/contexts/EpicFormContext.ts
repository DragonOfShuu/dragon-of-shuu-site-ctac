"use client";

import { createContext, useContext } from "react";

export type EpicFormDataType = {
    errors: { [param: string]: string };
};

export type EpicFormDataAction =
    | { type: "editError"; param: string; error: string }
    | { type: "removeError"; param: string };

export type EpicFormContextType = {
    epicFormData: EpicFormDataType;
    epicFormDataDispatch: React.Dispatch<EpicFormDataAction>;
};

export const EpicFormContext = createContext<EpicFormContextType | null>(null);

const useEpicFormData = () => {
    return useContext(EpicFormContext) as EpicFormContextType;
};

export const epicFormReducer = (
    oldState: EpicFormDataType,
    action: EpicFormDataAction,
): EpicFormDataType => {
    const newState = { ...oldState }; // Shallow new object
    switch (action.type) {
        case "editError": {
            if (oldState.errors[action.param] === action.error) return oldState;

            newState.errors = {
                ...oldState.errors,
                [action.param]: action.error,
            };

            return newState;
        }
        case "removeError": {
            if (!Object.keys(newState.errors).includes(action.param))
                return oldState;
            const { [action.param]: _, ...allElse } = newState.errors;
            newState.errors = allElse;
            return newState;
        }
    }
};

export default useEpicFormData;
