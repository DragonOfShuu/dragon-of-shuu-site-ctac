import EpicForm from "@/components/epicForms/EpicForm";
import EpicFormRow from "@/components/epicForms/EpicFormRow";
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
                        <input id={`name`} type={`text`} placeholder={`John Doe`} />
                    </EpicFormRow>
                    <EpicFormRow displayname={`Message`} paramName={`message`}>
                        <textarea id={`message`} placeholder={`Message...`} className={`w-full`} />
                    </EpicFormRow>
                    <EpicFormRow displayname={`Return Email`} paramName={`ret_addr`}>
                        <input id={`ret_addr`} placeholder={`johndoe@example.com`} type={`email`} />
                    </EpicFormRow>
                </EpicForm>
            </div>
        </>
    );
};

export default ContactUs;
