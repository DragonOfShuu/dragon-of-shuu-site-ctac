"use client";

import useEpicRow from "@/components/epicForms/contexts/EpicFormRowContext";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type EpicFormRegExInputPropType = {
    regexes: string[];
    errors: string[];
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;


/**
 * Verify an input matches regexes. Note that the
 * last regex is the most important, as the last 
 * regex must match the entire string.
 */
const EpicFormRegExInput = (props: EpicFormRegExInputPropType) => {
    const { regexes: regexStrings, errors: regexFailErrors, ...inputProps } = props;
    const { setFormError } = useEpicRow();
    const regexes = regexStrings.map((reggie) => new RegExp(reggie));

    const removeError = () => {
        setFormError(null);
    };

    const showError = (message: string) => {
        setFormError(message);
    };

    const findError = (text: string): {index: number, error: string}|null => {
        for (let i = 0; i < regexes.length; i++) {
            const regex = regexes[i];
            const found = text.match(regex)
            // If regex not found...
            if (found===null) {
                // Return an error
                return {index: i, error: regexFailErrors[i]}
            }
            // If this regex is the last one, and does not fully match...
            if (i===regexes.length-1 && found[0] !== text) {
                // Return an error
                return {index: i, error: regexFailErrors[i]}
            }
        }

        return null
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        // What to do if the user attempts to submit the form, but haven't even
        // even touched the button
        const currValue = e.target.value;

        if (!currValue && !inputProps.required) {
            removeError();
            return;
        }

        // const found = currValue.match(regex);
        const foundError = findError(currValue)

        if (!foundError) {
            removeError();
            return;
        }

        showError(foundError.error);
    };

    return <input {...inputProps} onBlur={onBlur} />;
};

export default EpicFormRegExInput;
