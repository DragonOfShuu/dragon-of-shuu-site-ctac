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
import { useState } from "react";

type ProjectViewerFilterPropType = {};

const ProjectViewerFilter = (props: ProjectViewerFilterPropType) => {
    const { isPending, projectBuffer, setSearchText, searchTags, setSearchTags } = useProjectSearch();
    const tagColorsTable = useGenerateTagColors(projectBuffer);

    const [tagFiltersVisible, setTagFiltersVisible] = useState<boolean>(false)

    return (
        <ProjectSearchDataContext.Provider
            value={{ projectBuffer, tagColorsTable, searchTags, setSearchTags }}
        >
            <div className={`flex flex-col flex-grow gap-3`}>
                <form className="flex flex-row gap-2 h-12">
                    <div
                        className={`grow rounded-full bg-orange-900 hover:bg-orange-800 border-2 border-orange-700 flex flex-row items-center px-2 gap-1 group`}
                    >
                        <SearchIcon
                            className={`h-3/4 w-auto stroke-orange-700 group-hover:stroke-orange-600`}
                        />
                        <input
                            alt={"Search input"}
                            placeholder={"Search..."}
                            className={`border-none bg-transparent grow outline-none self-stretch text-lg placeholder-orange-700 group-hover:stroke-orange-600`}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <SpecialButton type={"button"} onClick={() => setTagFiltersVisible((value) => !value)}>
                        <FilterIcon className={`h-full w-auto stroke-white`} />
                    </SpecialButton>
                </form>
                <ProjectTagSelector className={`transition-[height] ${tagFiltersVisible?`h-10`:`h-0`} overflow-hidden`} />
                {isPending ? (
                    <div
                        className={`flex-grow flex flex-col items-center justify-center bg-orange-950/30 m-10 rounded-xl`}
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
