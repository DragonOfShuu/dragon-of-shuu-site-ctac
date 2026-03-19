import getAllProjects from "@/app/libs/projectsAPI";
import ProjectViewerFilter from "@/app/projects/ProjectViewerFilter";

const ProjectViewerFilterServer = async () => {
    // TODO: change 1 number to adjustable page number, and add pagination to the component
    const initialProjects = await getAllProjects(1);

    return <ProjectViewerFilter initialProjectValue={initialProjects} />;
};

export default ProjectViewerFilterServer;
