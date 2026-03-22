import PageHeader from "@/components/PageHeader";
import EmphasizedContent from "@/components/EmphasizedContent";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import ProjectViewerFilter from "./ProjectViewerFilter";
import getProjects from "../libs/projectsAPI";

const MinisPage = async () => {
    return (
        <>
            <PageHeader>
                <EmphasizedContent alignment="left">
                    <h1>Projects</h1>
                </EmphasizedContent>
            </PageHeader>
            <div className={`flex flex-col grow py-5 px-2 md:p-10`}>
                <Suspense
                    fallback={
                        <div
                            className={`flex-grow flex flex-col items-center justify-center bg-orange-950/30 m-10 rounded-xl`}
                        >
                            <Loading />
                        </div>
                    }
                >
                    <ProjectViewerFilter initialProjectValue={getProjects(1)} />
                </Suspense>
            </div>
        </>
    );
};

export default MinisPage;
