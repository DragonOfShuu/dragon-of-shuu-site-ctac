import PageHeader from "@/components/PageHeader";
import ContactForm from "@/app/contact/ContactForm";
import EmphasizedContent from "@/components/EmphasizedContent";

const ContactUs = () => {
    // Do I know how RegEx works? Yes
    // Do I want to figure all THIS out by hand? Absolutely not

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
