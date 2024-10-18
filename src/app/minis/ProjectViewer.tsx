import { join } from "path";
import getAllProjects from "../libs/miniProjectsAPI";
import ProjectItem, { ImageDataType } from "./ProjectItem";

type ProjectViewerPropType = {};

const imageLocation = "/minis/image-bucket/";

const ProjectViewer = async (props: ProjectViewerPropType) => {
    const projs = await getAllProjects();

    return (
        <div className={`flex flex-col items-stretch gap-2`}>
            {projs.map((proj) => {
                const matter = proj.frontMatter;
                const imageData: Partial<ImageDataType> = {
                    height: matter.height || undefined,
                    width: matter.width || undefined,
                    src: join(imageLocation ?? '', matter.image ?? '').replace(/\\/g, "/"),
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
