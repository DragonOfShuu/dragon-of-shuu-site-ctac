import { searchProjects, getAllTags } from "@/app/libs/projectsAPI";
import { ProjectType } from "../libs/projectsAPI/types";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { pageSize as projectPageSize } from "../libs/projectsAPI/constants";

const useProjectSearch = (initialProjects: ProjectType[]) => {
    const [isPending, startTransition] = useTransition();
    const [projectBuffer, setProjectBuffer] =
        useState<ProjectType[]>(initialProjects);
    const [allTags, setAllTags] = useState<string[]>([]);
    const startSearchDelay = useRef<null | NodeJS.Timeout>(null);

    const [searchText, _setSearchText] = useState("");
    const [searchTags, _setSearchTags] = useState<string[]>([]);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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
                    1,
                    newSearchText ?? searchText,
                    newSearchTags ?? searchTags,
                );
                // Yes, this second start transition is necessary
                // https://react.dev/reference/react/useTransition#react-doesnt-treat-my-state-update-after-await-as-a-transition
                startTransition(() => {
                    setPage(1);
                    setHasMore(newProjects.length === projectPageSize);
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

    const loadMore = useCallback(async () => {
        if (isPending) return;
        if (!hasMore) return false;

        const moreProjects = await searchProjects(
            page + 1,
            searchText,
            searchTags,
        );
        if (moreProjects.length === 0) {
            setHasMore(false);
            return false;
        }
        if (moreProjects.length < projectPageSize) setHasMore(false);
        setProjectBuffer((buffer) => [...buffer, ...moreProjects]);
        setPage((page) => page + 1);
        return true;
    }, [isPending, hasMore, page, searchText, searchTags]);

    return {
        isPending,
        projectBuffer,
        allTags,
        searchText,
        setSearchText,
        searchTags,
        setSearchTags,
        hasMore,
        loadMore,
    };
};

export default useProjectSearch;
