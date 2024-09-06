import MarkdownTextbox from "@/app/contact/MarkdownTextbox";
import EpicForm from "@/components/epicForms/bases/EpicForm";
import EpicFormRow from "@/components/epicForms/bases/EpicFormRow";
import EpicFormSubmit from "@/components/epicForms/components/EpicFormSubmit";
import PageHeader from "@/components/PageHeader";
import EpicFormRegExInput from "@/components/epicForms/components/EpicFormRegExInput";
import { submitContactInfo } from "./SubmitData";

const ContactUs = () => {
    // Do I know how RegEx works? Yes
    // Do I want to figure all THIS out by hand? Absolutely not
    const emailAddrRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return (
        <>
            <PageHeader>
                <h1>Contact Us</h1>
            </PageHeader>
            <div className="w-full flex flex-col items-center">
                <EpicForm
                    action={submitContactInfo}
                    className={`w-full lg:w-[900px]`}
                >
                    <EpicFormRow displayname={`Name`} paramName={`name`}>
                        <EpicFormRegExInput
                            error={`Must be a valid name`}
                            regex={/\w{1,50}( [\w-]{1,50}){1,2}/.source}
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
                    <EpicFormRow
                        displayname={`Return Email`}
                        paramName={`ret_addr`}
                    >
                        <EpicFormRegExInput
                            error={`Must be a valid email address`}
                            regex={emailAddrRegex.source}
                            id={`ret_addr`}
                            name={`ret_addr`}
                            placeholder={`johndoe@example.com`}
                            type={`email`}
                            required
                        />
                    </EpicFormRow>
                    <EpicFormSubmit />
                </EpicForm>
            </div>
        </>
    );
};

export default ContactUs;
