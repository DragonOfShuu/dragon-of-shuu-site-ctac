import { useProjectSearchData } from "@/app/projects/ProjectSearchContext";

type ProjectTagSelectorPropType = {
    className?: string;
};

const ProjectTagSelector = (props: ProjectTagSelectorPropType) => {
    const { tagColorsTable, searchTags, setSearchTags } =
        useProjectSearchData();

    return (
        <div className={props.className}>
            <div className="flex gap-2 size-full overflow-x-auto">
                {Object.entries(tagColorsTable).map(([tagName, colors]) => {
                    const selected = searchTags.includes(tagName);
                    
                    const tagOnClick = () => {
                        const newTags = [...searchTags]
                        setSearchTags(() => {
                            if (newTags.includes(tagName))
                                return newTags.filter((tag) => tag!==tagName)
                            else
                                return [...newTags, tagName]
                        })
                    }

                    return (
                        <button
                            className={`rounded-full px-4 py-1 border-2 text-nowrap ${selected ? `border-white` : `border-transparent`}`}
                            style={{
                                backgroundColor: `rgb(${colors.join(", ")})`,
                            }}
                            onClick={tagOnClick}
                            key={tagName}
                        >
                            {tagName}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectTagSelector;
