import {MonthsFull} from "../utils.enum";

export class ProcessorUtils {

    /**
     * @param dateFrom - starting date
     * @param dateTo - ending date
     * @return difference in days between the two dates.
     * NB: 12/02/2022-08/02/2022=4 but 08/02/2022-12/02/2022=-4
     */
     static daysDifference(dateFrom: Date, dateTo: Date = new Date()): number {
         const differenceTime = dateTo.getTime() - dateFrom.getTime();
         return differenceTime / (1000 * 3600 * 24);
     }

    /**
     * @param list1 - first array
     * @param list2 - second array
     * @param filter - function to apply to filter the merged array
     * @param maxArrayLength - cuts away array elements from maxArrayLength to the last position
     * @param ascendingOrder - if false, cuts away elements from 0 to array.length-maxArrayLength position
     */
    static mergeArrays<T>(list1: T[] | undefined, list2: T[], maxArrayLength?: number, ascendingOrder: boolean = true, filter?: (item: T)=>boolean): T[] {
        let newList: T[] = list1 ? list1.concat(list2) : list2;
        filter && (newList = newList.filter(filter));
        if (maxArrayLength) {
            ascendingOrder
                ? newList = newList.slice(0, maxArrayLength)
                : newList = newList.reverse().slice(0, maxArrayLength).reverse();
        }
        return newList;
    }

    static monthIsInRange(pathName: string, timeIntervalDays: number): boolean {
        const match = pathName.match(/\d{4}\/(\d{4})_(\w+).json/);
        if (match && match[1] && match[2]) {
            const month: number = parseInt(MonthsFull[match[2] as any]);
            if (month) {
                //if 2017_APRIL then returns 1st APRIL 2017
                let date: Date = new Date(Date.UTC(parseInt(match[1]), month-1, 1));
                if (ProcessorUtils.daysDifference(date) < timeIntervalDays) {
                    return true;
                }
            }
        }
        return false;
    }

 }


