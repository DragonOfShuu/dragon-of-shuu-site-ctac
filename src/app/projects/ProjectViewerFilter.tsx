"use client";

import ProjectViewer from "@/app/projects/ProjectViewer";
import SearchIcon from '@/assets/lineIcons/searchIcon.svg'
import FilterIcon from '@/assets/lineIcons/filterIcon.svg'
import Loading from "@/components/Loading";
import SpecialButton from "@/components/SpecialButton";
import { useEffect, useRef, useState, useTransition } from "react";
import getAllProjects, { ProjectType, searchProjects } from "@/app/libs/miniProjectsAPI";

type ProjectViewerFilterPropType = {

}

const ProjectViewerFilter = (props: ProjectViewerFilterPropType) => {
    const [isPending, startTransition] = useTransition()
    const [projectBuffer, setProjectBuffer] = useState<ProjectType[]>([])
    const startSearchDelay = useRef<null|NodeJS.Timeout>(null)

    useEffect(()=> {
        startTransition(async () => {
            const newProjects = await getAllProjects();
            startTransition(() => {
                setProjectBuffer(newProjects)
            })
        })
    }, [])

    const setSearchText = (value: string) => {
        if (startSearchDelay.current !== null)
            clearTimeout(startSearchDelay.current)
        startSearchDelay.current = setTimeout(() => {
            startTransition(async () => {
                const newProjects = await searchProjects(value)
                startTransition(() => {
                    setProjectBuffer(newProjects)
                })
            })
        }, 500)
    }

    return (
        <>
            <form className="flex flex-row gap-2 h-12 mb-4">
                <div className={`grow rounded-full bg-orange-900 hover:bg-orange-800 border-2 border-orange-700 flex flex-row items-center px-2 gap-1 group`}>
                    <SearchIcon className={`h-3/4 w-auto stroke-orange-700 group-hover:stroke-orange-600`} />
                    <input alt={"Search input"} placeholder={"Search..."} className={`border-none bg-transparent grow outline-none self-stretch text-lg placeholder-orange-700 group-hover:stroke-orange-600`} onChange={(e) => setSearchText(e.target.value)} />
                </div>
                <SpecialButton type={'button'}>
                    <FilterIcon className={`h-full w-auto stroke-white`} />
                </SpecialButton>
            </form>
            {
                isPending ?
                    <div
                        className={`flex-grow flex flex-col items-center justify-center bg-orange-950/30 m-10 rounded-xl`}
                    >
                        <Loading />
                    </div>
                :
                    <ProjectViewer projects={projectBuffer} />
            }
        </>
    )
}

export default ProjectViewerFilter;
