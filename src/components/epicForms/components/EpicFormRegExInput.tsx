"use client";

import useEpicRow from "@/components/epicForms/contexts/EpicFormRowContext";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Verifier = {
    regex: RegExp;
    error: string;
};

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

    const findError = (text: string): string | null =>
        verifiers.find((verifier, index) => {
            const found = text.match(verifier.regex);
            // If regex not found...
            if (found === null) {
                // Return an error
                return true;
            }
            // If this regex is the last one, and does not fully match...
            if (index === verifiers.length - 1 && found[0] !== text) {
                // Return an error
                return true;
            }
        })?.error || null;

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
