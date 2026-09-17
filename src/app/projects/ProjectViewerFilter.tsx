"use client";

import ProjectViewer from "@/app/projects/ProjectViewer";
import SearchIcon from "@/assets/lineIcons/searchIcon.svg";
import FilterIcon from "@/assets/lineIcons/filterIcon.svg";
import Loading from "@/components/Loading";
import SpecialButton from "@/components/SpecialButton";
import ProjectSearchDataContext from "@/app/projects/ProjectSearchContext";
import useProjectSearch from "@/app/projects/useProjectSearch";
import useGenerateTagColors from "@/app/projects/useGenerateTagColors";
import ProjectTagSelector from "@/app/projects/ProjectTagSelector";
import { use, useState } from "react";
import { ProjectType } from "../lib/projects/types";

type ProjectViewerFilterPropType = {
    initialProjectValue: Promise<ProjectType[]>;
};

const ProjectViewerFilter = (props: ProjectViewerFilterPropType) => {
    const initialProjects = use(props.initialProjectValue);
    const {
        isPending,
        projectBuffer,
        allTags,
        setSearchText,
        searchTags,
        setSearchTags,
        hasMore,
        loadMore,
    } = useProjectSearch(initialProjects);
    const tagColorsTable = useGenerateTagColors(allTags);

    const [tagFiltersVisible, setTagFiltersVisible] = useState<boolean>(false);

    return (
        <ProjectSearchDataContext.Provider
            value={{
                projectBuffer: projectBuffer ?? [],
                tagColorsTable,
                searchTags,
                setSearchTags,
                hasMore,
                loadMore,
            }}
        >
            <div className={`flex flex-col flex-grow gap-3`}>
                <form className="flex flex-row flex-wrap gap-2">
                    <div
                        className={`grow rounded-full h-12 bg-black/60 hover:bg-black/40 border-2 border-orange-500/40 focus-within:border-amber-400 flex flex-row items-center px-3 gap-2 group transition-colors`}
                    >
                        <SearchIcon
                            className={`h-3/4 w-auto stroke-orange-300 group-hover:stroke-amber-400`}
                        />
                        <input
                            placeholder={"Search..."}
                            className={`border-none bg-transparent grow outline-none self-stretch text-lg placeholder:text-orange-300/60`}
                            type={`text`}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <SpecialButton
                        type={"button"}
                        onClick={() => setTagFiltersVisible((value) => !value)}
                        className={`h-12 px-4`}
                    >
                        <FilterIcon
                            className={`h-full w-auto m-auto stroke-current`}
                        />
                    </SpecialButton>
                </form>
                <ProjectTagSelector
                    className={`transition-[height] ${tagFiltersVisible ? `h-14` : `h-0`} overflow-hidden`}
                />
                {isPending || projectBuffer === null ? (
                    <div
                        className={`flex-grow flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm border border-orange-500/20 m-10 rounded-xl`}
                    >
                        <Loading />
                    </div>
                ) : (
                    <ProjectViewer />
                )}
            </div>
        </ProjectSearchDataContext.Provider>
    );
};

export default ProjectViewerFilter;
