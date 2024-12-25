import getAllProjects from "@/app/libs/miniProjectsAPI";
import ProjectViewerFilter from "@/app/projects/ProjectViewerFilter";


const ProjectViewerFilterServer = async () => {
    const initialProjects = await getAllProjects();

    return (
        <ProjectViewerFilter initialProjectValue={initialProjects} />
    )
}

export default ProjectViewerFilterServer;