
import {ValidatorDatasource} from "../../utils/validator/validator.datasource";
import Logger from "../../utils/logger";
import {FileCodeAmazon} from "./enum.amazon";

export class ValidatorAmazon extends ValidatorDatasource  {
    protected readonly logger = new Logger("Amazon Validator");

    protected DEFAULT_FILE_CODES: FileCodeAmazon[] = [
        FileCodeAmazon.ADV_AUDIENCES,
        FileCodeAmazon.ADV_CLICKS,
        FileCodeAmazon.ADV_THIRDPARTIES,
        FileCodeAmazon.ALEXA_CALENDARS,
        FileCodeAmazon.ALEXA_KARAOKE,
        FileCodeAmazon.ALEXA_LISTS,
        FileCodeAmazon.ALEXA_LOCATION,
        FileCodeAmazon.ALEXA_SHOPPING,
        FileCodeAmazon.APPSTORE_SUB_PERIOD,
        FileCodeAmazon.AUDIBLE_LIBRARY,
        FileCodeAmazon.AUDIBLE_LISTENING,
        FileCodeAmazon.AUDIBLE_MEMBERSHIP_BILLINGS,
        FileCodeAmazon.AUDIBLE_MEMBERSHIP_EVENT,
        FileCodeAmazon.AUDIENCES,
        FileCodeAmazon.CUSTOMER_ENGAGEMENT,
        FileCodeAmazon.DIGITAL_CUSTOMER_ATTRIBUTES,
        FileCodeAmazon.DIGITAL_ORDERING_ITEM,
        FileCodeAmazon.DIGITAL_ORDERING_MONETARY,
        FileCodeAmazon.DIGITAL_ORDERING_ORDERS,
        FileCodeAmazon.DIGITAL_ORDERING_PAYMENT_INFO,
        FileCodeAmazon.DIGITAL_SUBSCRIPTION,
        FileCodeAmazon.DIGITAL_SUBSCRIPTION_BENEFICIARIES,
        FileCodeAmazon.DIGITAL_SUBSCRIPTION_BILLING_SCHEDULE,
        FileCodeAmazon.DIGITAL_SUBSCRIPTION_PERIODS,
        FileCodeAmazon.DIGITAL_SUBSCRIPTION_STATUS_HISTORY,
        FileCodeAmazon.GAMES_EGRESS_IDENTITY,
        FileCodeAmazon.GAMES_TWITCHPRIME_ACCOUNT_HISTORY,
        FileCodeAmazon.GAMES_TWITCHPRIME_SUB_HISTORY,
        FileCodeAmazon.GAMES_TWITCHPRIME_LINKED_ACCOUNT,
        FileCodeAmazon.MUSIC_ACCOUNT,
        FileCodeAmazon.PRIMEVIDEO_VIEW_COUNT,
        FileCodeAmazon.PRIMEVIDEO_WATCHLIST,
        FileCodeAmazon.PRIMEVIDEO_WATCHLIST_HISTORY,
        FileCodeAmazon.PRIMEVIDEO_WATCH_EVENT,
        FileCodeAmazon.RETAIL_CART_ITEMS,
        FileCodeAmazon.RETAIL_COMMUNITY_CONTRIBUTION_ELIGIBILITY,
        FileCodeAmazon.RETAIL_CUSTOMER_PROFILE_ATTRIBUTES,
        FileCodeAmazon.RETAIL_CUSTOMER_RETURNS,
        FileCodeAmazon.RETAIL_CUSTOMER_REVIEWS,
        FileCodeAmazon.RETAIL_LIGHT_WEIGHT_INTERACTIONS,
        FileCodeAmazon.RETAIL_ORDER_HISTORY,
        FileCodeAmazon.RETAIL_REGION_AUTHORITY,
        FileCodeAmazon.RETAIL_SEARCH_CUSTOMER_ENGAGEMENT,
        FileCodeAmazon.RETAIL_SELLER_FEEDBACK,
        FileCodeAmazon.SUBSCRIPTION_BILLING_REFUNDS_DATA,
        FileCodeAmazon.WISHLIST,
    ];

    public getFileCode(pathName: string): string | undefined {
        const compatiblePath = this.extractCompatiblePath(pathName);
        return Object.keys(FileCodeAmazon).find((code: FileCodeAmazon | string) => (RegExp('^' + code + '$').test(compatiblePath)));
    }
}
