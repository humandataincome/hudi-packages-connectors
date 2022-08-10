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
