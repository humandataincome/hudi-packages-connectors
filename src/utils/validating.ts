
export class Validating {

    static objectIsEmpty(obj: object): boolean{
        return ((obj) && (Object.keys(obj).length === 0))
        //&& (Object.getPrototypeOf(obj) === Object.prototype))
    }

    /**
     * @param time - is the 17 digit timestamp of Google Chrome (Webkit Timestamp)
     * @return Date
     */
    static converWebkitTimestamp(time: number): Date {
        const dateInSeconds = Math.round(time / 1000000) - 11644473600;
        return new Date(dateInSeconds * 1000);
    }
}