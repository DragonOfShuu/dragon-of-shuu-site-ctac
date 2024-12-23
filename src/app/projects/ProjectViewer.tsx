import { useMemo } from "react";
import { ProjectType } from "../libs/miniProjectsAPI";
import ProjectItem from "./ProjectItem";
import { randomInt } from '@/clientlibs/random'

type ProjectViewerPropType = {
    projects: ProjectType[]
};

const randomColorValue = () => {
    return randomInt(50, 240)
}

const ProjectViewer = ({projects}: ProjectViewerPropType) => {
    const tagColorsTable = useMemo(() => (
        projects.reduce<{[tagName: string]: [number, number, number]}>((built, {tags}) => {
            let newBuilt = built;
            tags?.forEach((tagName) => {
                newBuilt = {...newBuilt, [tagName]: [randomColorValue(), randomColorValue(), randomColorValue()]}
            })
            return newBuilt
        }, {})
    ), [projects])

    if (projects.length === 0)
        return (
            <div className={`size-full flex items-center justify-center md:grow`}>
                <p className={`font-bold text-2xl md:text-4xl xl:text-6xl text-center text-orange-900`}>
                    No Projects Found
                </p>
            </div>
        )

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
