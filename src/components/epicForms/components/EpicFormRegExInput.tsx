"use client";

import useEpicRow from "@/components/epicForms/contexts/EpicFormRowContext";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { findErrorInRegex } from "../../../app/lib/userVerification/findErrorInRegex";
import { Verifier } from "@/app/lib/userVerification/types";

export type EpicFormRegExInputPropType = {
    regexes: Verifier[];
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

/**
 * Verify an input matches regexes. Note that the
 * last regex is the most important, as the last
 * regex must match the entire string.
 */
const EpicFormRegExInput = (props: EpicFormRegExInputPropType) => {
    const { regexes: verifiers, ...inputProps } = props;

    const { setFormError } = useEpicRow();
    // const regexes = verifiers.map((verifier) => new RegExp(verifier.regex));

    const removeError = () => {
        setFormError(null);
    };

    const showError = (message: string) => {
        setFormError(message);
    };

    const findError = (text: string) => findErrorInRegex(verifiers, text);

    const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        // What to do if the user attempts to submit the form, but haven't even
        // even touched the button
        const currValue = e.target.value;

        if (!currValue && !inputProps.required) {
            removeError();
            return;
        }

        // const found = currValue.match(regex);
        const foundError = findError(currValue);

        if (!foundError) {
            removeError();
            return;
        }

        showError(foundError);
    };

    return <input {...inputProps} onBlur={onBlur} />;
};

export default EpicFormRegExInput;
