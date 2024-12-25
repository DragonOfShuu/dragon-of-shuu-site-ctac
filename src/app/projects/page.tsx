import PageHeader from "@/components/PageHeader";
import EmphasizedContent from "@/components/EmphasizedContent";
import ProjectViewerFilterServer from "@/app/projects/ProjectViewerFilterServer";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const MinisPage = async () => {
    return (
        <>
            <PageHeader>
                <EmphasizedContent alignment="left">
                    <h1>Projects</h1>
                </EmphasizedContent>
            </PageHeader>
            <div className={`flex flex-col grow p-10`}>
                <Suspense
                    fallback={
                        <div
                            className={`flex-grow flex flex-col items-center justify-center bg-orange-950/30 m-10 rounded-xl`}
                        >
                            <Loading />
                        </div>
                    }
                >
                    <ProjectViewerFilterServer />
                </Suspense>
            </div>
        </>
    );
};

export default MinisPage;
