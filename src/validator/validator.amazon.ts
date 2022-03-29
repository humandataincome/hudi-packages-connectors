import {FileCode} from "../descriptor";
import {ValidatorDatasource} from "./validator.datasource";
import {InputFileFormat} from "./validator";

export class ValidatorAmazon extends ValidatorDatasource  {

    /**
     * @param zipFile - file zip containing file that must be parsed
     * @param fileList - optional list of paths of file (as FileCode) that we want to keep into the file zip
     * @return buffer containing all useful files that have been found
     */
    static async selectUsefulFilesFromZip(
        zipFile: InputFileFormat,
        fileList: FileCode[] = [
            FileCode.AMAZON_ADV_AUDIENCES,
            FileCode.AMAZON_ADV_CLICKS,
            FileCode.AMAZON_AUDIENCES,
            FileCode.AMAZON_ADV_THIRDPARTIES,
            FileCode.AMAZON_AUDIBLE_LISTENING,
            FileCode.AMAZON_AUDIBLE_LIBRARY,
            FileCode.AMAZON_AUDIBLE_MEMBERSHIP_BILLINGS,
            FileCode.AMAZON_AUDIBLE_MEMBERSHIP_EVENT,
            FileCode.AMAZON_DIGITAL_SUBSCRIPTION,
            FileCode.AMAZON_PRIMEVIDEO_VIEW_COUNT,
            FileCode.AMAZON_RETAIL_LIGHT_WEIGHT_INTERACTIONS,
            FileCode.AMAZON_RETAIL_SELLER_FEEDBACK,
            FileCode.AMAZON_RETAIL_ORDER_HISTORY,
            FileCode.AMAZON_RETAIL_REGION_AUTHORITY,
        ]): Promise<Buffer | undefined> {
        return super.selectUsefulFilesFromZip(zipFile, fileList);
    }
}
