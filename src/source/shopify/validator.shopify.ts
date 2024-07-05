import { ValidatorDatasource } from '../../validator/validator.datasource';
import LoggerUtils from '../../utils/logger.utils';
import { FileCodeShopify } from './enum.shopify';

export class ValidatorShopify extends ValidatorDatasource {
    protected readonly logger = new LoggerUtils('Shopify Validator');

    protected DEFAULT_FILE_CODES: FileCodeShopify[] = [
        FileCodeShopify.CUSTOMERS,
        FileCodeShopify.ORDERS,
        FileCodeShopify.DISCOUNTS,
        FileCodeShopify.PRODUCTS,
    ];
}
