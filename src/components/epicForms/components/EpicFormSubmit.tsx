"use client";

import SpecialButton from "../../SpecialButton";
import useEpicFormData from "../contexts/EpicFormContext";
import EpicFormLabelless from "../bases/EpicFormLabelless";
import React from "react";
import { useFormStatus } from "react-dom";

type EpicFormSubmitPropsType = {
    submitText?: string;
    submittingText?: string;
} & React.JSX.IntrinsicElements["button"];

const EpicFormSubmit = (props: EpicFormSubmitPropsType) => {
    const { epicFormData } = useEpicFormData();
    const formStatus = useFormStatus();

    const { submitText, disabled, submittingText, ...buttonProps } = props;

    const errors = epicFormData.errors;
    const buttonDisabled = Object.keys(errors).length !== 0;

    return (
        <EpicFormLabelless>
            <SpecialButton
                {...buttonProps}
                type="submit"
                disabled={buttonDisabled || disabled || formStatus.pending}
            >
                {formStatus.pending
                    ? (submittingText ?? "Submitting...")
                    : (submitText ?? "Submit")}
            </SpecialButton>
        </EpicFormLabelless>
    );
};

export default EpicFormSubmit;
