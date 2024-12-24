import { ProjectType } from "@/app/libs/miniProjectsAPI";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type TagToColor = {
    [tagName: string]: [number, number, number]
}

type ProjectSearchDataContextType = {
    projectBuffer: ProjectType[],
    tagColorsTable: TagToColor,
    searchTags: string[], 
    setSearchTags: Dispatch<SetStateAction<string[]>>
}

const ProjectSearchDataContext = createContext<ProjectSearchDataContextType|null>(null)

export const useProjectSearchData = () => {
    return useContext(ProjectSearchDataContext) as ProjectSearchDataContextType
}

export default ProjectSearchDataContext;
