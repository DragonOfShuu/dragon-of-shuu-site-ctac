import getAllProjects from "../libs/miniProjectsAPI";

type ProjectViewerPropType = {

}

const ProjectViewer = async (props: ProjectViewerPropType) => {
    const projs = await getAllProjects();

    return (
        <pre>
            {
                JSON.stringify(projs)
            }
        </pre>
    )
}

export default ProjectViewer;