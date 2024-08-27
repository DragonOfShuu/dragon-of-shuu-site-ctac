'use client'

import {
    EpicFormContext,
    epicFormReducer,
} from "@/components/epicForms/contexts/EpicFormContext";
import { ReactNode, useReducer } from "react";

type EpicFormContextCompPropType = {
    children?: ReactNode;
};

const EpicFormContextComp = (props: EpicFormContextCompPropType) => {
    const [epicFormData, epicFormDataDispatch] = useReducer(epicFormReducer, {
        errors: {},
    });

    return (
        <EpicFormContext.Provider
            value={{ epicFormData, epicFormDataDispatch }}
        >
            {props.children}
        </EpicFormContext.Provider>
    );
};

export default EpicFormContextComp;
