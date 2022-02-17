import {InstagramDataAggregator} from "./processor.instagram.model";

export class ProcessorUtils {

     static daysDifference(date1: Date, date2: Date): number {
         const differenceTime = Math.abs(date2.getTime() - date1.getTime());
         return differenceTime / (1000 * 3600 * 24);
     }

     static calculateInstagramPoints(model: InstagramDataAggregator): number {
         return 0;
     }

 }