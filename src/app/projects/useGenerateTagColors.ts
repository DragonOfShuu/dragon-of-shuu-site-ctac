import { randomInt } from "@/clientlibs/random";
import { useMemo } from "react";

const randomColorValue = () => {
    return randomInt(50, 240);
};

const useGenerateTagColors = (tags: string[]) => {
    const tagColorsTable = useMemo(
        () =>
            tags.reduce<{ [tagName: string]: [number, number, number] }>(
                (built, newTag) => {
                    return {
                        ...built,
                        [newTag]: [
                            randomColorValue(),
                            randomColorValue(),
                            randomColorValue(),
                        ],
                    };
                },
                {},
            ),
        [tags],
    );

    return tagColorsTable;
};

export default useGenerateTagColors;
