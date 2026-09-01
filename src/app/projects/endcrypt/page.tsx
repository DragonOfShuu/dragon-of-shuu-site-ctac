import PageHeader from "@/components/PageHeader";
import EmphasizedContent from "@/components/EmphasizedContent";
import Translations from "@/app/projects/endcrypt/Translations";

const Page = () => {
    return (
        <>
            <PageHeader>
                <EmphasizedContent alignment="left">
                    <h1>Endcrypt</h1>
                </EmphasizedContent>
            </PageHeader>
            <main className={`flex flex-col p-4 md:p-10 w-full items-center`}>
                <Translations />
            </main>
        </>
    );
};

export default Page;
