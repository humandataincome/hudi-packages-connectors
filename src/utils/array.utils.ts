export function sliceIfTooLong<T>(array: T[], maxEntitiesPerArray: number = Infinity): T[] {
    if (array.length > maxEntitiesPerArray) {
        return array.slice(0, maxEntitiesPerArray);
    } else {
        return array;
    }
}
