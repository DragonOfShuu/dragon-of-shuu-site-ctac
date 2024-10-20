const runes: string[] = [
    "ᚨ",
    "ᛒ",
    "ᚲ",
    "ᛞ",
    "ᛖ",
    "ᚠ",
    "ᚷ",
    "ᚺ",
    "ᛁ",
    "ᛃ",
    "ᛚ",
    "ᛗ",
    "ᚾ",
    "ᛟ",
    "ᚴ",
    "ᛈ",
    "ᚱ",
    "ᛋ",
    "ᛏ",
    "ᚢ",
    "ᚹ",
    "ᛉ",
    "ᛇ"
]

const chars: string[][] = [
    ["a"],  
    ["b"],
    ["c"],
    ["d"],
    ["e"],
    ["f"],
    ["g"],
    ["h"],
    ["i"],
    ["j"],
    ["l"],
    ["m"],
    ["n"],
    ["o"],
    ["k", "o"],
    ["p"],
    ["r"],
    ["s"],
    ["t"],
    ["u", "v"],
    ["w"],
    ["x", "z"],
    ["y", "æ"]
]

const runes2: string[] = [
    "ᚦ"
]

const chars2: string[][] = [
    ["th"]
]

const replaceIn2D = (item: string, twoDim: string[][], returnChars: string[]): string | null => {
    for (let i = 0; i < twoDim.length; i++ ) {
        for (let f = 0; f < twoDim[i].length; f++) {
            let element2: string = twoDim[i][f];

            if (item === element2) {
                return returnChars[i];
            }

        }
    };
    return null;
}

const convertToRune = (text: string): string => {
    text = text.toLowerCase();
    let newText: string = "";

    for (let i = 0; i < text.length; i++) {
        const item: string = text[i];
        let newCharacter: string | null;

        // Try to find and replace 2 characters to one    
        newCharacter = replaceIn2D((item + text[i+1]), chars2, runes2);
        if (newCharacter != undefined) {
            newText += newCharacter;
            i++;
            continue;
        }
        
        // Find and replace 1 character to 1
        newCharacter = replaceIn2D(item, chars, runes);
        // console.log(newCharacter)
        if (newCharacter != undefined) {
            newText += newCharacter;
            continue;
        }

        // If can't find the character, just apply it
        // to the translation.
        newText += item;
    }

    return newText;
}

const replaceIn1D = (element: string, from: string[], to: string[][], isAssumption: boolean): string | undefined => {
    let index = from.indexOf(element)
    if (index==-1) return undefined;
    
    let appendable = to[index];
    if (appendable.length == 1 || isAssumption) return appendable[0];
    else {
        return `[${appendable.join("/")}]`;
    }
}

const convertFromRune = (text: string, isAssumption: boolean): string => {
    let newText: string = "";
    for (let i = 0; i < text.length; i++) {
        let element = text[i];

        let newElement: string | undefined;

        // Check if the element can be found in the 2 char
        newElement = replaceIn1D(element, runes2, chars2, isAssumption);
        if (newElement != undefined) { newText+=newElement; continue; }

        // check if the element can be found in the 1 char
        newElement = replaceIn1D(element, runes, chars, isAssumption);
        if (newElement != undefined) { newText+=newElement; continue; }

        // If neither, leave it untranslated
        newText += element;
    }
    return newText;
}

export { convertToRune, convertFromRune };
