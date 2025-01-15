"use client";

import MarkdownTextbox from "@/app/contact/MarkdownTextbox";
import EpicForm from "@/components/epicForms/bases/EpicForm";
import EpicFormRow from "@/components/epicForms/bases/EpicFormRow";
import EpicFormSubmit from "@/components/epicForms/components/EpicFormSubmit";
import EpicFormRegExInput from "@/components/epicForms/components/EpicFormRegExInput";
import { submitContactInfo } from "./SubmitContactInfo";

const ContactForm = () => {
    const emailAddrRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return (
        <EpicForm action={submitContactInfo} className={`w-full lg:w-[900px]`}>
            <EpicFormRow displayname={`Name`} paramName={`name`}>
                <EpicFormRegExInput
                    regexes={[
                        {
                            error: `Must include at least a first and last name`,
                            regex: /\w+\s\w+/,
                        },
                        {
                            error: `Cannot include numbers`,
                            regex: /\w+\s*/
                        },
                        {
                            error: `First, middle, surname, and last name acceptable only. Use hyphens otherwise`,
                            regex: /\w{1,50}( [\w-]{1,50}){1,3}/
                        }
                    ]}
                    id={`name`}
                    name={`name`}
                    type={`text`}
                    placeholder={`John Doe`}
                    required
                />
            </EpicFormRow>
            <EpicFormRow displayname={`Message`} paramName={`message`}>
                <MarkdownTextbox
                    id={`message`}
                    name={`message`}
                    placeholder={`Message...`}
                    charmax={1000}
                    required
                />
            </EpicFormRow>
            <EpicFormRow displayname={`Return Email`} paramName={`ret_addr`}>
                <EpicFormRegExInput
                    regexes={[
                        {
                            error: `Missing '@' symbol`,
                            regex: /\@/
                        },
                        {
                            error: `Missing proper domain name (e.g.: gmail.com)`,
                            regex: /.+@.+\..+/
                        },
                        {
                            error: `Must be a valid email address`,
                            regex: emailAddrRegex
                        }
                    ]}
                    id={`ret_addr`}
                    name={`ret_addr`}
                    placeholder={`johndoe@example.com`}
                    type={`email`}
                    required
                />
            </EpicFormRow>
            <EpicFormSubmit />
        </EpicForm>
    );
};

export default ContactForm;
