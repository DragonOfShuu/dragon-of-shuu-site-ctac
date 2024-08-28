"use client";

import { createContext, useContext } from "react";

export type EpicFormRowDataType = {
    paramName: string;
    displayName: string;
    error: string | null;
};

export type EpicFormRowContextType = {
    epicRowData: EpicFormRowDataType;
    setFormError: (error: string | null) => unknown;
};

export const EpicFormRowContext = createContext<EpicFormRowContextType | null>(
    null,
);

const useEpicRow = () => {
    return useContext(EpicFormRowContext) as EpicFormRowContextType;
};

export default useEpicRow;
