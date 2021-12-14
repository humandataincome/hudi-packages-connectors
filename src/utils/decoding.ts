
export class Decoding {
    static decodeUTF8(s: string) {
        return decodeURIComponent(escape(s));
    }

    static decodeObject(obj: any): any{
        if(typeof(obj) === 'string') {
            return this.decodeUTF8(obj);
        } else {
            let keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                if (typeof (obj[keys[i]]) === 'string') {
                    obj[keys[i]] = this.decodeUTF8(obj[keys[i]]);
                } else if (typeof (obj[keys[i]]) === 'object') {
                    obj[keys[i]] = this.decodeObject(obj[keys[i]]);
                }
            }
            return obj;
        }
    }
}

