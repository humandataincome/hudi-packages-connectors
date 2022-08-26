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
    public static mergeArrays<T>(list1: T[] | undefined, list2: T[], maxArrayLength?: number, ascendingOrder: boolean = true, filter?: (item: T)=>T): T[] {
        let newList: T[] = list1 ? list1.concat(list2) : list2;
        filter && (newList = newList.map(filter));
        if (maxArrayLength) {
            ascendingOrder
                ? newList = newList.slice(0, maxArrayLength)
                : newList = newList.reverse().slice(0, maxArrayLength).reverse();
        }
        return newList;
    }

 }

/**
 * timeIntervalDays: set the number of days for the data relevance's time interval. Default is 3654 days.
 * maxEntitiesPerArray: set the max length for arrays of objects.
 * throwExceptions: TRUE to throw exception outside the Processor method, FALSE otherwise. Default is False.
 */
export type ProcessorOptions = {
    timeIntervalDays?: number;
    maxEntitiesPerArray?: number;
    throwExceptions?: boolean;
}

