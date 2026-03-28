"use client";

import { DetailedHTMLProps, FormHTMLAttributes, useActionState } from "react";
import styles from "./EpicForms.module.sass";
import EpicFormContextComp from "@/components/epicForms/contexts/EpicFormContextComp";
import useEpicFormData from "../contexts/EpicFormContext";

type EpicFormPropType = DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
> & {
    epicAction: (
        formdata: FormData,
    ) => Promise<{ message: string }> | { message: string };
};

/**
 * Acts as a wrapper for Epic Forms, and adds context
 * @param props form props, as well as Epic Form wrapper props
 */
const EpicForm = (props: EpicFormPropType) => {
    return (
        <EpicFormContextComp>
            <EpicFormInner {...props} />
        </EpicFormContextComp>
    );
};

const EpicFormInner = (props: EpicFormPropType) => {
    const { className, epicAction, ...formProps } = props;
    const { epicFormDataDispatch } = useEpicFormData();

    const formAction = async (formdata: FormData) => {
        const result = await epicAction(formdata);
        epicFormDataDispatch({
            type: "setSubmissionError",
            error: result.message,
        });
    };

    return (
        <div className={className}>
            <form
                {...formProps}
                action={formAction}
                className={`${styles.formRoot}`}
            />
        </div>
    );
};

export default EpicForm;
