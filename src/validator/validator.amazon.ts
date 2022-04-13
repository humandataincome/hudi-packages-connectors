import {FileCode, FileCodeAmazon} from "../descriptor";
import {ValidatorDatasource} from "./validator.datasource";
import {InputFileFormat} from "./index";

export class ValidatorAmazon extends ValidatorDatasource  {
    /**
     * @param zipFile - file zip containing file that must be parsed
     * @param fileList - optional list of paths of file (as FileCode) that we want to keep into the file zip
     * @return buffer containing all useful files that have been found
     */
    static async selectUsefulFilesFromZip(
        zipFile: InputFileFormat,
        fileList: FileCode[] = [
            FileCodeAmazon.ADV_AUDIENCES,
            FileCodeAmazon.ADV_CLICKS,
            FileCodeAmazon.AUDIENCES,
            FileCodeAmazon.ADV_THIRDPARTIES,
            FileCodeAmazon.AUDIBLE_LIBRARY,
            FileCodeAmazon.DIGITAL_SUBSCRIPTION,
            FileCodeAmazon.PRIMEVIDEO_VIEW_COUNT,
            FileCodeAmazon.RETAIL_LIGHT_WEIGHT_INTERACTIONS,
            FileCodeAmazon.RETAIL_SELLER_FEEDBACK,
            FileCodeAmazon.RETAIL_ORDER_HISTORY,
            FileCodeAmazon.RETAIL_REGION_AUTHORITY,
        ]): Promise<Buffer | undefined> {
        return super.selectUsefulFilesFromZip(zipFile, fileList);
    }
}
