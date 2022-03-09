
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
            if(error == 'URIError: URI malformed'){
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
}

