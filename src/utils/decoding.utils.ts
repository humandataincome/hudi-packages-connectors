export class DecodingUtils {
    /**
     * Decode input recursively in all their parameters.
     * @param obj - string, array or object.
     * @return the same object in input, but decoded
     */
    static decodeObject(obj: any): any {
        try {
            if (typeof obj === 'string') {
                return decodeURIComponent(escape(obj));
            } else {
                return this.decodeObjectParameters(obj);
            }
        } catch (error) {
            if (error === 'URIError: URI malformed') {
                return obj;
            }
            throw error;
        }
    }

    private static decodeObjectParameters(obj: any): any {
        const keys = Object.keys(obj);
        for (const key of keys) {
            if (typeof obj[key] === 'string') {
                obj[key] = decodeURIComponent(obj[key]);
            } else if (typeof obj[key] === 'object') {
                obj[key] = this.decodeObjectParameters(obj[key]);
            }
        }
        return obj;
    }

    /**
     * @param time - is the 17 digit timestamp of Google Chrome (Webkit Timestamp)
     * @return a compatible Date format
     */
    static convertWebkitTimestamp(time: number): Date {
        const dateInSeconds = Math.round(time / 1000000) - 11644473600;
        return new Date(dateInSeconds * 1000);
    }
}
