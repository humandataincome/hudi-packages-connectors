
export class Decoding {
    /**
     * Decode input recursively in all their parameters.
     * @param obj - string, array or object.
     * @return the same object in input, but decoded
     */
    static decodeObject(obj: any): any{
        try {
            if (typeof (obj) === 'string') {
                return decodeURIComponent(escape(obj));
            } else {
                return this.decodeObjectParameters(obj);
            }
        } catch(error){
            if(error === 'URIError: URI malformed'){
                return obj;
            }
            throw error;
        }
    }

    private static decodeObjectParameters(obj: any): any{
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            if (typeof (obj[keys[i]]) === 'string') {
                obj[keys[i]] = decodeURIComponent(obj[keys[i]]);
            } else if (typeof (obj[keys[i]]) === 'object') {
                obj[keys[i]] = this.decodeObjectParameters(obj[keys[i]]);
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

