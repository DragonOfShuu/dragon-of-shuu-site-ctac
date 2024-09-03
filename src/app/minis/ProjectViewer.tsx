import { join } from "path";
import getAllProjects from "../libs/miniProjectsAPI";
import ProjectItem, { imageDataType } from "./ProjectItem";

type ProjectViewerPropType = {};

const imageLocation = "/minis/image-bucket/";

const ProjectViewer = async (props: ProjectViewerPropType) => {
    const projs = await getAllProjects();

    return (
        <div className={`flex flex-col items-stretch gap-2`}>
            {projs.map((proj) => {
                const matter = proj.frontMatter;
                const imageData: imageDataType = {
                    height: matter.height,
                    width: matter.width,
                    src: join(imageLocation, matter.image),
                };

                return (
                    <ProjectItem
                        href={`/minis/${proj.dirName}`}
                        name={proj.frontMatter.name}
                        image={imageData}
                        key={proj.dirName}
                        description={proj.content}
                    />
                );
            })}
        </div>
    );
};

export default ProjectViewer;
