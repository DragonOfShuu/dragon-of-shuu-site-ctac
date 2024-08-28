"use client";

import SpecialButton from "../SpecialButton";
import useEpicFormData from "./contexts/EpicFormContext";
import EpicFormLabelless from "./EpicFormLabelless";

type EpicFormSubmitPropsType = {
    submitText?: string;
};

const EpicFormSubmit = (props: EpicFormSubmitPropsType) => {
    const { epicFormData } = useEpicFormData();

    const errors = epicFormData.errors;
    const buttonDisabled = Object.keys(errors).length !== 0;

    return (
        <EpicFormLabelless>
            <SpecialButton type="submit" disabled={buttonDisabled}>
                {props.submitText ?? "Submit"}
            </SpecialButton>
        </EpicFormLabelless>
    );
};

export default EpicFormSubmit;
