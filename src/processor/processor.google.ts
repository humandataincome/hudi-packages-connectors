import {InputFileFormat, Validator} from "../validator";
import { GoogleDataAggregator } from "./processor.aggregator.model";

export class ProcessorGoogle {
    /**
     * @param zipFile - file zip as Buffer
     * @param timeIntervalDays - optional days of interval wanted for TI parameters, default value is 365
     * @return aggregation of data from Facebook data source
     */
    static async aggregatorFactory(zipFile: InputFileFormat, timeIntervalDays: number = 365): Promise<GoogleDataAggregator | undefined> {
        const JSZip = require("jszip");
        const model: GoogleDataAggregator = {};
        let result, regex;
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                await file.async('nodebuffer').then(async (data: Buffer) => {

                });
            }
        }
        return !Validator.objectIsEmpty(model) ? model : undefined;
    }
}
