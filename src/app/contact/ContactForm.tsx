"use client";

import MarkdownTextbox from "@/app/contact/MarkdownTextbox";
import EpicForm from "@/components/epicForms/bases/EpicForm";
import EpicFormRow from "@/components/epicForms/bases/EpicFormRow";
import EpicFormSubmit from "@/components/epicForms/components/EpicFormSubmit";
import EpicFormRegExInput from "@/components/epicForms/components/EpicFormRegExInput";
import { submitContactInfo } from "../api/contactAPI/submitContactInfo";
import {
    nameVerifier,
    messageLengthVerifier,
    emailAddressVerifier,
} from "../lib/contact/verifications";

const ContactForm = () => {
    return (
        <EpicForm
            epicAction={submitContactInfo}
            className={`w-full lg:w-[900px]`}
        >
            <EpicFormRow displayname={`Name`} paramName={`name`}>
                <EpicFormRegExInput
                    regexes={nameVerifier}
                    id={`name`}
                    name={`name`}
                    type={`text`}
                    placeholder={`John Doe`}
                    className={`input-box`}
                    required
                />
            </EpicFormRow>
            <EpicFormRow displayname={`Message`} paramName={`message`}>
                <MarkdownTextbox
                    id={`message`}
                    name={`message`}
                    placeholder={`Message...`}
                    maxLength={messageLengthVerifier}
                    required
                />
            </EpicFormRow>
            <EpicFormRow displayname={`Return Email`} paramName={`ret_addr`}>
                <EpicFormRegExInput
                    regexes={emailAddressVerifier}
                    id={`ret_addr`}
                    name={`ret_addr`}
                    placeholder={`johndoe@example.com`}
                    type={`email`}
                    className={`input-box`}
                    required
                />
            </EpicFormRow>
            <EpicFormSubmit />
        </EpicForm>
    );
};

export default ContactForm;
