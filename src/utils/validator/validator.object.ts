export class ValidatorObject {
    /**
     * @param obj - an object in input
     * @return FALSE if this is a not empty object (it has at least a key and a parameter not empty), TRUE otherwise.
     */
    public static objectIsEmpty(obj: any): boolean {
        if (Object.getPrototypeOf(obj) === Object.prototype) {
            if (obj && Object.keys(obj).length > 0) {
                const reducer = (previousValue: boolean, currentValue: string) => {
                    return (obj[currentValue] === '') && previousValue;
                };
                return Object.keys(obj).reduce(reducer, true);
            }
            return true;
        }
        return true;
    }

    public static isCSVFieldValid(value: any): boolean {
        try {
            return (value !== undefined && value !== '' && value !== 'N/A');
        } catch {
            return false;
        }
    }

    /**
     * @param path - a string representing a directory path
     * @return True if ends with a '/' like /marcus/documents/, False if is a file like /marcus/documents/file.txt
     */
    public static isDirectory(path: string): boolean {
        return path.endsWith('/');
    }
}
