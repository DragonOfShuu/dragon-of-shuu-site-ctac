import RuneTableType from "./tables/runetable.type";

const replaceFrom2D = (
    text: string,
    convertFrom: string[][],
    convertTo: string[],
): string => {
    let remainingText = text;
    let newText = "";
    console.log("STARTTTT");
    while (remainingText.length) {
        let replaceLength = 1;
        console.log(remainingText);
        // Find the index that we'll convert to in the second array
        // by looking through the first array
        const replaceableIndex = convertFrom.findIndex((convertFromElement) => {
            return convertFromElement.some((letters) => {
                replaceLength = letters.length;
                return remainingText.startsWith(letters);
            });
        });

        // If no replacement was found...
        if (replaceableIndex === -1) {
            // Add the current letter to the newText
            newText += remainingText[0];
            // And remove the first character
            remainingText = remainingText.slice(1);
            continue;
        }

        // Add new character
        newText += convertTo[replaceableIndex];
        // Remove characters used at the front
        remainingText = remainingText.slice(replaceLength);
    }
    return newText;
};

const convertToRune = (text: string, table: RuneTableType): string => {
    text = text.toLowerCase();

    return replaceFrom2D(text, table.chars, table.runes);
};

const replaceFrom1D = (
    text: string,
    convertFrom: string[],
    convertTo: string[][],
    isAssumption: boolean,
): string => {
    return text
        .split("")
        .map((fromChar) => {
            let fromIndex = convertFrom.indexOf(fromChar);
            if (fromIndex === -1) return fromChar;
            let toList = convertTo[fromIndex];

            if (toList.length === 1 || isAssumption) return toList[0];

            return `[${toList.join("/")}]`;
        })
        .join("");
};

const convertFromRune = (
    text: string,
    runeTable: RuneTableType,
    isAssumption: boolean,
): string => {
    return replaceFrom1D(text, runeTable.runes, runeTable.chars, isAssumption);
};

export { convertToRune, convertFromRune };
