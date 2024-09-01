"use client";

import useEpicRow from "@/components/epicForms/contexts/EpicFormRowContext";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type EpicFormRegExInputPropType = {
    regex: string;
    error: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const EpicFormRegExInput = (props: EpicFormRegExInputPropType) => {
    const { regex: regexString, error: regexFailError, ...inputProps } = props;
    const { setFormError } = useEpicRow();
    const regex = new RegExp(regexString);

    const removeError = () => {
        setFormError(null);
    };

    const showError = () => {
        setFormError(regexFailError);
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        // What to do if the user attempts to submit the form, but haven't even
        // even touched the button
        const currValue = e.target.value;

        if (!currValue && !inputProps.required) {
            removeError();
            return;
        }

        const found = currValue.match(regex);

        if (found !== null && found[0] === currValue) {
            removeError();
            return;
        }

        showError();
    };

    return <input {...inputProps} onBlur={onBlur} />;
};

export default EpicFormRegExInput;
