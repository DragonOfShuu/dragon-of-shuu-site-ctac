import MarkdownTextbox from "@/app/contact/MarkdownTextbox";
import EpicForm from "@/components/epicForms/EpicForm";
import EpicFormRow from "@/components/epicForms/EpicFormRow";
import EpicFormSubmit from "@/components/epicForms/EpicFormSubmit";
import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";

type ContactSubmissionType = {
    name: string,
    message: string,
    ret_addr: string,
}

const ContactUs = () => {

    const submitContactInfo = async (formData: FormData) => {
        "use server";

        const getData: (keyof ContactSubmissionType)[] = [
            'name',
            'message',
            'ret_addr'
        ]

        const rawFormData = getData.reduce<Partial<ContactSubmissionType>>((prev, curr) => {
            // Some may call this lazy. I call it ✨fashionable✨
            prev[curr] = (formData.get(curr)??undefined) as string|undefined;
            return prev
        }, {});

        console.log("Emailing data (and more!)", rawFormData)

        const builtParams = Object.entries(rawFormData).map(([key, value]) => `${key}=${value}`).join('&')
        const redirURL = encodeURI(`/contact/thank-you/?${builtParams}`)

        redirect(redirURL)
    }

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
                        />
                    </EpicFormRow>
                    <EpicFormRow displayname={`Message`} paramName={`message`}>
                        <MarkdownTextbox
                            id={`message`}
                            name={`message`}
                            placeholder={`Message...`}
                        />
                    </EpicFormRow>
                    <EpicFormRow
                        displayname={`Return Email`}
                        paramName={`ret_addr`}
                    >
                        <input
                            id={`ret_addr`}
                            name={`ret_addr`}
                            placeholder={`johndoe@example.com`}
                            type={`email`}
                        />
                    </EpicFormRow>
                    <EpicFormSubmit />
                </EpicForm>
            </div>
        </>
    );
};

export default ContactUs;
