import {ValidatorDatasource} from "../../utils/validator/validator.datasource";
import LoggerUtils from "../../utils/logger.utils";
import {FileCodeAmazon} from "./enum.amazon";

export class ValidatorAmazon extends ValidatorDatasource  {
    protected readonly logger = new LoggerUtils("Amazon Validator");

    protected DEFAULT_FILE_CODES: FileCodeAmazon[] = [
        FileCodeAmazon.ADV_AUDIENCES,
        FileCodeAmazon.ADV_CLICKS,
        FileCodeAmazon.ADV_THIRDPARTIES,
        FileCodeAmazon.AUDIENCES,
        FileCodeAmazon.AUDIBLE_LIBRARY,
        FileCodeAmazon.AUDIBLE_LISTENING,
        FileCodeAmazon.AUDIBLE_MEMBERSHIP_BILLINGS,
        FileCodeAmazon.CUSTOMER_ENGAGEMENT,
        FileCodeAmazon.DIGITAL_ORDERING_ITEM,
        FileCodeAmazon.DIGITAL_ORDERING_MONETARY,
        FileCodeAmazon.DIGITAL_ORDERING_ORDERS,
        FileCodeAmazon.DIGITAL_SUBSCRIPTION,
        FileCodeAmazon.GAMES_TWITCHPRIME_SUB_HISTORY,
        FileCodeAmazon.GAMES_TWITCHPRIME_ACCOUNT_HISTORY,
        FileCodeAmazon.GAMES_TWITCHPRIME_LINKED_ACCOUNTS,
        FileCodeAmazon.PRIMEVIDEO_WATCHLIST,
        FileCodeAmazon.PRIMEVIDEO_WATCHLIST_HISTORY,
        FileCodeAmazon.PRIMEVIDEO_VIEW_COUNT,
        FileCodeAmazon.PRIMEVIDEO_VIEWINGHISTORY,
        FileCodeAmazon.RETAIL_LIGHT_WEIGHT_INTERACTIONS,
        FileCodeAmazon.RETAIL_CART_ITEMS,
        FileCodeAmazon.RETAIL_ORDER_HISTORY,
        FileCodeAmazon.RETAIL_REGION_AUTHORITY,
        FileCodeAmazon.RETAIL_SELLER_FEEDBACK,
        FileCodeAmazon.WISHLIST,
    ];
}
