import getAllProjects from "../libs/miniProjectsAPI";
import ProjectItem from "./ProjectItem";

type ProjectViewerPropType = {};

const ProjectViewer = async (props: ProjectViewerPropType) => {
    const projects = await getAllProjects();

    return (
        <div className={`flex flex-col items-stretch gap-2`}>
        {projects.map((proj) => {
            return (
                <ProjectItem
                    {...proj}
                    key={proj.name}
                />
            );
        })}
    </div>
    );
};

export default ProjectViewer;
