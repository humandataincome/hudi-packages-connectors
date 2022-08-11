// SHOPIFY_CUSTOMERS, SHOPIFY_ORDERS, SHOPIFY_PRODUCTS, SHOPIFY_DISCOUNTS collapse into this enum of file codes
export enum FileCodeShopify {
    CUSTOMERS = 'customers_export_(\\d+).csv',
    ORDERS = 'orders_export_(\\d+).csv',
    PRODUCTS = 'products_export_(\\d+).csv',
    DISCOUNTS = 'discounts_export_(\\d+)..csv',
}
