import { useIntersectionObserver } from "usehooks-ts";
import ProjectItem from "./ProjectItem";
import { useProjectSearchData } from "@/app/projects/ProjectSearchContext";
import { Activity } from "react";
import Loading from "@/components/Loading";

type ProjectViewerPropType = {};

const ProjectViewer = ({}: ProjectViewerPropType) => {
    const {
        projectBuffer: projects,
        tagColorsTable,
        loadMore,
        hasMore,
    } = useProjectSearchData();
    const { ref } = useIntersectionObserver({
        threshold: 0.25,
        onChange: (isIntersecting) => {
            if (!isIntersecting || !hasMore) return;
            loadMore();
        },
    });

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
            {projects.map((proj, index) => (
                <ProjectItem
                    {...proj}
                    tagColorsTable={tagColorsTable}
                    key={`${proj.id} ${index}`}
                />
            ))}
            <Activity mode={hasMore ? "visible" : "hidden"}>
                <div ref={ref} className="h-48">
                    <Loading></Loading>
                </div>
            </Activity>
        </div>
    );
};

export default ProjectViewer;
