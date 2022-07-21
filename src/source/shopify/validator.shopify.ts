import {ValidatorDatasource} from "../../utils/validator/validator.datasource";
import Logger from "../../utils/logger";
import {FileCodeShopify} from "../../descriptor";

export class ValidatorShopify extends ValidatorDatasource {
    protected readonly logger = new Logger("Shopify Validator");

    protected DEFAULT_FILE_CODES: FileCodeShopify[] = [
        FileCodeShopify.CUSTOMERS,
        FileCodeShopify.ORDERS,
        FileCodeShopify.DISCOUNTS,
        FileCodeShopify.PRODUCTS,
    ];
}
