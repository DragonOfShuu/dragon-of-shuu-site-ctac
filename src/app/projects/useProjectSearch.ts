import getAllProjects, { ProjectType, searchProjects } from "@/app/libs/miniProjectsAPI"
import { useEffect, useRef, useState, useTransition } from "react"


const useProjectSearch = () => {
    const [isPending, startTransition] = useTransition()
    const [projectBuffer, setProjectBuffer] = useState<ProjectType[]>([])
    const startSearchDelay = useRef<null|NodeJS.Timeout>(null)

    const [searchText, setSearchText] = useState('');
    const [searchTags, setSearchTags] = useState<string[]>([]);

    useEffect(() => {
        startSearchDelay.current = setTimeout(() => {
            startTransition(async () => {
                const newProjects = await searchProjects(searchText, searchTags)
                startTransition(() => {
                    setProjectBuffer(newProjects)
                })
            })
        }, 500)

        return () => {
            if (startSearchDelay.current !== null)
                clearTimeout(startSearchDelay.current)
        }
    }, [searchText, searchTags])

    return {isPending, projectBuffer, searchText, setSearchText, searchTags, setSearchTags}
}

export default useProjectSearch;
