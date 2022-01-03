
export class Decoding {
    /**
     * Decode input recursively in all their parameters.
     * @param obj - string, array or object.
     * @return the same object in input, but decoded
     */
    static decodeObject(obj: any): any{
        if(typeof(obj) === 'string') {
            return this.decodeUTF8(obj);
        } else {
            return this.decodeObjectSupport(obj);
        }
    }

    private static decodeObjectSupport(obj: any): any{
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            if (typeof (obj[keys[i]]) === 'string') {
                obj[keys[i]] = this.decodeUTF8(obj[keys[i]]);
            } else if (typeof (obj[keys[i]]) === 'object') {
                obj[keys[i]] = this.decodeObjectSupport(obj[keys[i]]);
            }
        }
        return obj;
    }

    static decodeUTF8(s: string) {
        return decodeURIComponent(escape(s));
    }

}

