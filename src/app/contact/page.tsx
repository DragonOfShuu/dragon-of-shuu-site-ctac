import EpicForm from "@/components/epicForms/EpicForm";
import EpicFormRow from "@/components/epicForms/EpicFormRow";
import EpicFormSubmit from "@/components/epicForms/EpicFormSubmit";
import PageHeader from "@/components/PageHeader";

const ContactUs = () => {
    return (
        <>
            <PageHeader>
                <h1>Contact Us</h1>
            </PageHeader>
            <div className="w-full flex flex-col items-center">
                <EpicForm method={`get`} action={'/contact/thankYou'} className={`w-full lg:w-[900px]`}>
                    <EpicFormRow displayname={`Name`} paramName={`name`}>
                        <input id={`name`} name={`name`} type={`text`} placeholder={`John Doe`} />
                    </EpicFormRow>
                    <EpicFormRow displayname={`Message`} paramName={`message`}>
                        <textarea id={`message`} name={`message`} placeholder={`Message...`} className={`w-full h-48`} />
                    </EpicFormRow>
                    <EpicFormRow displayname={`Return Email`} paramName={`ret_addr`}>
                        <input id={`ret_addr`} name={`ret_addr`} placeholder={`johndoe@example.com`} type={`email`} />
                    </EpicFormRow>
                    <EpicFormSubmit />
                </EpicForm>
            </div>
        </>
    );
};

export default ContactUs;
