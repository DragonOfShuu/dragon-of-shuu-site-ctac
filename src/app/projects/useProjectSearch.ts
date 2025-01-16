import {
    ProjectType,
    searchProjects,
    getAllTags,
} from "@/app/libs/projectsAPI";
import { useEffect, useRef, useState, useTransition } from "react";

const useProjectSearch = (initialProjects: ProjectType[]) => {
    const [isPending, startTransition] = useTransition();
    const [projectBuffer, setProjectBuffer] =
        useState<ProjectType[]>(initialProjects);
    const [allTags, setAllTags] = useState<string[]>([]);
    const startSearchDelay = useRef<null | NodeJS.Timeout>(null);

    const [searchText, _setSearchText] = useState("");
    const [searchTags, _setSearchTags] = useState<string[]>([]);

    useEffect(() => {
        getAllTags().then((newTags) => {
            setAllTags(newTags);
        });
    }, []);

    useEffect(() => {
        return () => {
            if (startSearchDelay.current !== null)
                clearTimeout(startSearchDelay.current);
        };
    }, []);

    const scheduleSearch = (
        newSearchText?: string,
        newSearchTags?: string[],
    ) => {
        if (startSearchDelay.current !== null)
            clearTimeout(startSearchDelay.current);

        startSearchDelay.current = setTimeout(() => {
            startTransition(async () => {
                const newProjects = await searchProjects(
                    newSearchText ?? searchText,
                    newSearchTags ?? searchTags,
                );
                startTransition(() => {
                    setProjectBuffer(newProjects);
                });
            });
        }, 500);
    };

    const setSearchText = (newValue: string) => {
        _setSearchText(newValue);
        scheduleSearch(newValue);
    };

    const setSearchTags = (newValue: React.SetStateAction<string[]>) => {
        _setSearchTags(newValue);
        _setSearchTags((tags) => {
            scheduleSearch(undefined, tags);
            return tags;
        });
    };

    return {
        isPending,
        projectBuffer,
        allTags,
        searchText,
        setSearchText,
        searchTags,
        setSearchTags,
    };
};

export default useProjectSearch;
