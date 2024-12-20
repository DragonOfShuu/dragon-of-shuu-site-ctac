import { Suspense } from "react";
import ProjectViewer from "./ProjectViewer";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";
import EmphasizedContent from "@/components/EmphasizedContent";

const MinisPage = async () => {
    return (
        <>
            <PageHeader>
                <EmphasizedContent alignment="left">
                    <h1>Projects</h1>
                </EmphasizedContent>
            </PageHeader>
            <Suspense
                fallback={
                    <div
                        className={`flex-grow flex flex-col items-center justify-center bg-orange-950/30 m-10 rounded-xl`}
                    >
                        <Loading />
                    </div>
                }
            >
                <div className={`flex-grow m-10`}>
                    <ProjectViewer />
                </div>
            </Suspense>
        </>
    );
};

export default MinisPage;
