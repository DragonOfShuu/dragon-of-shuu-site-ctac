import ProjectItem from "./ProjectItem";
import { useProjectSearchData } from "@/app/projects/ProjectSearchContext";

type ProjectViewerPropType = {};

const ProjectViewer = ({}: ProjectViewerPropType) => {
    const { projectBuffer: projects, tagColorsTable } = useProjectSearchData();

    if (projects.length === 0)
        return (
            <div
                className={`size-full flex items-center justify-center md:grow`}
            >
                <p
                    className={`font-bold text-2xl md:text-4xl xl:text-6xl text-center text-orange-900`}
                >
                    No Projects Found
                </p>
            </div>
        );

    return (
        <div className={`flex flex-col items-stretch gap-2`}>
            {projects.map((proj) => {
                return (
                    <ProjectItem
                        {...proj}
                        tagColorsTable={tagColorsTable}
                        key={proj.name}
                    />
                );
            })}
        </div>
    );
};

export default ProjectViewer;
