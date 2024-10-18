import PageHeader from "@/components/PageHeader";
import ContactForm from "@/app/contact/ContactForm";
import EmphasizedContent from "@/components/EmphasizedContent";

const ContactUs = () => {
    return (
        <>
            <PageHeader>
                <EmphasizedContent alignment="left">
                    <h1>Contact Us</h1>
                </EmphasizedContent>
            </PageHeader>
            <div className="w-full flex flex-col items-center">
                <ContactForm />
            </div>
        </>
    );
};

export default ContactUs;
