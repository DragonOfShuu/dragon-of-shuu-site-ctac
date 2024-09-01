"use client";

import { ReactNode, useMemo } from "react";
import styles from "./EpicForms.module.sass";
import EpicFormRowComp from "@/components/epicForms/contexts/EpicFormRowComp";
import useEpicFormData from "@/components/epicForms/contexts/EpicFormContext";

export type EpicFormRowPropType = {
    children?: ReactNode;
    displayname: string;
    paramName: string;
};

const EpicFormRow = ({
    children,
    displayname,
    paramName,
}: EpicFormRowPropType) => {
    const { epicFormData } = useEpicFormData();

    const error: string | undefined = useMemo(
        () => epicFormData.errors?.[paramName],
        [epicFormData.errors, paramName],
    );

    return (
        <EpicFormRowComp
            displayName={displayname}
            paramName={paramName}
            error={error}
        >
            <div className={`${styles.formRow}`}>
                <label htmlFor={paramName}>{displayname}</label>
                <div className={`${styles.formRowChildren}`}>{children}</div>
            </div>
            {error ? <div className={`${styles.error}`}>{error}</div> : null}
        </EpicFormRowComp>
    );
};

export default EpicFormRow;
