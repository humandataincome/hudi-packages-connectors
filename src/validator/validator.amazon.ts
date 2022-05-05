import {FileCodeAmazon} from "../descriptor";
import {ValidatorDatasource} from "./validator.datasource";

export class ValidatorAmazon extends ValidatorDatasource  {

    protected DEFAULT_FILE_CODES: FileCodeAmazon[] = [
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
    ];
}
