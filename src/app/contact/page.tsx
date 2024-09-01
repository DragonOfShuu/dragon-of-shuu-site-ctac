import MarkdownTextbox from "@/app/contact/MarkdownTextbox";
import EpicForm from "@/components/epicForms/bases/EpicForm";
import EpicFormRow from "@/components/epicForms/bases/EpicFormRow";
import EpicFormSubmit from "@/components/epicForms/components/EpicFormSubmit";
import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { contactSubmissionKeys, ContactSubmissionType } from "@/app/contact/contactTypes";
import EpicFormRegExInput from "@/components/epicForms/components/EpicFormRegExInput";

const ContactUs = () => {

    const submitContactInfo = async (formData: FormData) => {
        "use server";

        const rawFormData = contactSubmissionKeys.reduce<Partial<ContactSubmissionType>>((prev, curr) => {
            // Some may call this lazy. I call it ✨fashionable✨
            prev[curr] = (formData.get(curr)??undefined) as string|undefined;
            return prev
        }, {});

        console.log("Emailing data (and more!)", rawFormData)

        const redirURL = `/contact/thank-you/?${new URLSearchParams(rawFormData)}`

        redirect(redirURL)
    }

    const emailAddrRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

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
                        <input
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
                            required
                        />
                    </EpicFormRow>
                    <EpicFormRow
                        displayname={`Return Email`}
                        paramName={`ret_addr`}
                    >
                        <EpicFormRegExInput 
                            error={`Input must be an email address`}
                            regex={emailAddrRegex}
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
