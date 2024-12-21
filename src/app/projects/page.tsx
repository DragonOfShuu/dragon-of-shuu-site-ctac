import PageHeader from "@/components/PageHeader";
import EmphasizedContent from "@/components/EmphasizedContent";
import ProjectViewerFilter from "@/app/projects/ProjectViewerFilter";

const MinisPage = async () => {
    return (
        <>
            <PageHeader>
                <EmphasizedContent alignment="left">
                    <h1>Projects</h1>
                </EmphasizedContent>
            </PageHeader>
            <div className={`flex flex-col grow p-10`}>
                <ProjectViewerFilter />
            </div>
        </>
    );
};

export default MinisPage;
