function listOfSimilars<T>(value: T, count: number) {
    const newList = [];
    for (let i = 0; i < count; i++) {
        newList.push(value);
    }
    return newList;
}

/**
 * Checks the existence of indices in
 * multidimensional arrays
 * @param array
 * @param index
 * @returns true if coords exist, false if not.
 */
function checkIndex<T extends any[]>(array: T, ...index: number[]): boolean {
    if (index.length == 0) return true;

    const newArray: any = array[index[0]];

    if (newArray === undefined) return false;
    if (!Array.isArray(newArray)) return true;

    const newIndex = [...index];
    newIndex.shift();
    return checkIndex(newArray, ...newIndex);
}

export { listOfSimilars, checkIndex };
