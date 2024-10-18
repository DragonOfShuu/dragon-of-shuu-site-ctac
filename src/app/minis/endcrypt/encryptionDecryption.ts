function randNum(min = 0, max = 10) {
    let num = Math.random() * (max - min) + min;

    return Math.floor(num);
}

function cipher(iterated: string, chars: string = "abcdefghijklmnopqrstuvwxyz ", count: number = 4) {
    var ciphered = "";
    for (let i = 0; i < iterated.length; i++) {
        // sus
        var data;
        if (chars.includes(iterated[i])) {
            // --- Code is Written Like This For Readability ---
            // Find the index of the character in the list of chracters
            data = chars.indexOf(iterated[i]);
            // Accelerate the index by the count
            data = data+count;
            // Puts the data within scope using modulus
            data = data % chars.length
            // If it is negative, it adds it to the length of the characters, if it is even, it applies the index right away
            if (data < 0) {
                ciphered += chars[chars.length + data]
            } else {
                ciphered += chars[data]
            }
        } else {
            ciphered += iterated[i];
        }
    }
    return ciphered;
}

function breakKey(key: string) {
    let Number1 = key[0] + key[1];
    let Number2 = key[2] + key[3];
    return [parseInt(Number1), parseInt(Number2)];
}

function reverseString(text: string) {
    let newText = "";
    for (let i = 0; i < text.length; i++) {
        const element = text[i];
        newText = element + newText;
    }

    return newText;
}

function encrypt(inputValue: string, key: string) {
    let newValue = inputValue.toLowerCase()

    // Break Down Key
    let [key1, key2] = breakKey(key);
    newValue = reverseString(newValue);

    const ABCs = "abcdefghijklmnopqrstuvwxyz";

    let newCharacters = "";
    let newABCs = ABCs;
    for (let i = 0; i < newValue.length; i++) {
        const el = newValue[i];
        if (!ABCs.includes(el) && !newCharacters.includes(el)) {
            newCharacters += el;
        } else {
            try {
                newABCs = newABCs.replace(el, "");
            } catch {
                console.log("SomEthInG wENt WronG")
            }
        }

        // Prevent "NaN"'s
        if (i % 16 == 0 && i != 64) {
            newABCs += ABCs
        }
    }
    
    const allChars = ABCs + newCharacters;
    newABCs += newCharacters;

    newValue = cipher(newValue, ABCs, key1);

    // Main Algorithm (Ironically)
    let newinput = "";
    for (let i = 0; i < newValue.length; i++) {
        const element = newValue[i];
        newinput += newABCs[randNum(0, newABCs.length)] + newABCs[randNum(0, newABCs.length)] + element;
    }

    newValue = newinput;
    newValue = cipher(newValue, ABCs, key2);
    
    newValue = newValue.replaceAll(" ", "~");

    return newValue;
}

function decrypt(inputValue: string, key: string) {
    const ABCs = "abcdefghijklmnopqrstuvwxyz";

    inputValue = inputValue.replaceAll("~", " ");

    let [key1, key2] = breakKey(key);
    inputValue = cipher(inputValue, ABCs, key2*-1);

    inputValue = reverseString(inputValue);

    let newInputValue = "";
    for (let i = 0; i < inputValue.length; i++) {
        const el = inputValue[i];
        if (i % 3 == 0) {
            newInputValue += el;
        }
    }

    newInputValue = cipher(newInputValue, ABCs, key1*-1);

    return newInputValue;
}

export { encrypt, decrypt }
