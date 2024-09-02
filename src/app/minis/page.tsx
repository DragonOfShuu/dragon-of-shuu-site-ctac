import NavMargin from "@/components/nav/navBar/NavMargin";
import { Suspense } from "react";
import ProjectViewer from "./ProjectViewer";

const MinisPage = async () => {
    
    return (
        <>
            <NavMargin />
            <Suspense fallback={<p>{`Loading...`}</p>}>
                <ProjectViewer />
            </Suspense>
        </>
    )

}

export default MinisPage;