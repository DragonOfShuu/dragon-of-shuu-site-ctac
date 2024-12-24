import { ProjectType } from "@/app/libs/miniProjectsAPI";
import { randomInt } from "@/clientlibs/random";
import { useMemo } from "react";

const randomColorValue = () => {
    return randomInt(50, 240)
}

const useGenerateTagColors = (projects: ProjectType[]) => {
    const tagColorsTable = useMemo(() => (
        projects.reduce<{[tagName: string]: [number, number, number]}>((built, {tags}) => {
            let newBuilt = built;
            tags?.forEach((tagName) => {
                newBuilt = {...newBuilt, [tagName]: [randomColorValue(), randomColorValue(), randomColorValue()]}
            })
            return newBuilt
        }, {})
    ), [projects])

    return tagColorsTable
}

export default useGenerateTagColors;
