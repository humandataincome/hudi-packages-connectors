import Logger from "../../utils/logger";
import {
    CustomerExportSH,
    CustomersExportsSH, DiscountExportSH,
    DiscountsExportsSH, OrderExportSH,
    OrdersExportsSH, ProductExportSH, ProductsExportsSH
} from "./model.shopify";
import {Parser} from "../../utils/parser";
import {FileCodeShopify} from "../../descriptor";

export class ServiceShopify {
    private static readonly logger = new Logger("Shopify Service");

    /**
     * Abstraction to parse a Shopify file regardless its respective parsing function
     * @param fileCode - code of the file to parse
     * @param data - file to parse as Buffer
     */
    static async parseFile(fileCode: FileCodeShopify, data: Buffer) {
        switch (fileCode) {
            case FileCodeShopify.CUSTOMERS:
                return this.parseCustomersExport(data);
            case FileCodeShopify.ORDERS:
                return this.parseOrdersExport(data);
            case FileCodeShopify.PRODUCTS:
                return this.parseProductsExport(data);
            case FileCodeShopify.DISCOUNTS:
                return this.parseDiscountsExport(data);
            default:
                return undefined;
        }
    }

    /**
     * @param data - file 'shopify/customers_export_1.csv' in input as Buffer
     */
    static async parseCustomersExport(data: Buffer): Promise<CustomersExportsSH | undefined> {
        try {let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: CustomersExportsSH = {list: []}
                model.list = result.map((listItem: any) => {
                    let modelInfo: CustomerExportSH = {};
                    (listItem['First Name'] != '') && (modelInfo.firstName = listItem['First Name']);
                    (listItem['Last Name'] != '') && (modelInfo.lastName = listItem['Last Name']);
                    (listItem['Email'] != '') && (modelInfo.email = listItem['Email']);
                    (listItem['Accepts Email Marketing'] != '') && (modelInfo.acceptsEmailMarketing = listItem['Accepts Email Marketing'].toLowerCase() === 'yes');
                    (listItem['Company'] != '') && (modelInfo.company = listItem['Company']);
                    (listItem['Address1'] != '') && (modelInfo.address1 = listItem['Address1']);
                    (listItem['Address2'] != '') && (modelInfo.address2 = listItem['Address2']);
                    (listItem['City'] != '') && (modelInfo.city = listItem['City']);
                    (listItem['Province'] != '') && (modelInfo.province = listItem['Province']);
                    (listItem['Province Code'] != '') && (modelInfo.provinceCode = listItem['Province Code']);
                    (listItem['Country'] != '') && (modelInfo.country = listItem['Country']);
                    (listItem['Country Code'] != '') && (modelInfo.countryCode = listItem['Country Code']);
                    (listItem['Zip'] != '') && (modelInfo.zipCode = listItem['Zip']);
                    (listItem['Phone'] != '') && (modelInfo.phone = listItem['Phone']);
                    (listItem['Accepts SMS Marketing'] != '') && (modelInfo.acceptsSMSMarketing = listItem['Accepts SMS Marketing'].toLowerCase() === 'yes');
                    (listItem['Total Spent'] != '') && (modelInfo.totalSpent = parseFloat(listItem['Total Spent']));
                    (listItem['Total Orders'] != '') && (modelInfo.totalOrders = parseFloat(listItem['Total Orders']));
                    (listItem['Tags'] != '') && (modelInfo.tags = listItem['Tags']);
                    (listItem['Note'] != '') && (modelInfo.note = listItem['Note']);
                    (listItem['Tax Exempt'] != '') && (modelInfo.taxExempt = listItem['Tax Exempt'].toLowerCase() === 'yes');
                    return modelInfo;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseCustomersExport');
            return undefined;
        }
    }

    /**
     * @param data - file 'shopify/discounts_export_1csv' in input as Buffer
     */
    static async parseDiscountsExport(data: Buffer): Promise<DiscountsExportsSH | undefined> {
        try {let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: DiscountsExportsSH = {list: []}
                model.list = result.map((listItem: any) => {
                    let modelInfo: DiscountExportSH = {};
                    (listItem['Name'] != '') && (modelInfo.name = listItem['Name']);
                    (listItem['Value'] != '') && (modelInfo.value = parseFloat(listItem['Value']));
                    (listItem['Value Type'] != '') && (modelInfo.valueType = listItem['Value Type']);
                    (listItem['Times Used In Total'] != '') && (modelInfo.timeUsedInTotal = parseFloat(listItem['Times Used In Total']));
                    (listItem['Usage Limit Per Code'] != '') && (modelInfo.usageLimitPerCode = parseFloat(listItem['Usage Limit Per Code']));
                    (listItem['Status'] != '') && (modelInfo.status = listItem['Status']);
                    (listItem['Start'] != '') && (modelInfo.start = new Date(listItem['Start']));
                    (listItem['End'] != '') && (modelInfo.end = new Date(listItem['End']));
                    return modelInfo;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseDiscountsExport');
            return undefined;
        }
    }

    /**
     * @param data - file 'shopify/orders_export_1csv' in input as Buffer
     */
    static async parseOrdersExport(data: Buffer): Promise<OrdersExportsSH | undefined> {
        try {let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: OrdersExportsSH = {list: []}
                model.list = result.map((listItem: any) => {
                    let modelInfo: OrderExportSH = {};
                    (listItem['Name'] != '') && (modelInfo.name = listItem['Name']);
                    (listItem['Email'] != '') && (modelInfo.email = listItem['Email']);
                    (listItem['Financial Status'] != '') && (modelInfo.financialStudio = listItem['Financial Status']);
                    (listItem['Paid at'] != '') && (modelInfo.paidAt = new Date(listItem['Paid at']));
                    (listItem['Fulfillment Status'] != '') && (modelInfo.fulfillmentStatus = listItem['Fulfillment Status']);
                    (listItem['Fulfilled at'] != '') && (modelInfo.fulfillmentAt = new Date(listItem['Fulfilled at']));
                    (listItem['Accepts Marketing'] != '') && (modelInfo.acceptMarketing = listItem['Accepts Marketing'].toLowerCase() === 'yes');
                    (listItem['Currency'] != '') && (modelInfo.currency = listItem['Currency']);
                    (listItem['Subtotal'] != '') && (modelInfo.subtotal = parseFloat(listItem['Subtotal']));
                    (listItem['Shipping'] != '') && (modelInfo.shipping = parseFloat(listItem['Shipping']));
                    (listItem['Taxes'] != '') && (modelInfo.taxes = parseFloat(listItem['Taxes']));
                    (listItem['Total'] != '') && (modelInfo.total = parseFloat(listItem['Total']));
                    (listItem['Discount Code'] != '') && (modelInfo.discountCode = listItem['Discount Code']);
                    (listItem['Discount Amount'] != '') && (modelInfo.discountAmount = parseFloat(listItem['Discount Amount']));
                    (listItem['Shipping Method'] != '') && (modelInfo.shippingMethod = listItem['Shipping Method']);
                    (listItem['Created at'] != '') && (modelInfo.createdAt = new Date(listItem['Created at']));
                    (listItem['Lineitem quantity'] != '') && (modelInfo.limitItemQuantity = parseFloat(listItem['Lineitem quantity']));
                    (listItem['Lineitem name'] != '') && (modelInfo.limitItemName = listItem['Lineitem name']);
                    (listItem['Lineitem price'] != '') && (modelInfo.limitItemPrice = parseFloat(listItem['Lineitem price']));
                    (listItem['Lineitem compare at price'] != '') && (modelInfo.limitItemCompareAtPrice = parseFloat(listItem['Lineitem compare at price']));
                    (listItem['Lineitem sku'] != '') && (modelInfo.limitItemSku = parseFloat(listItem['Lineitem sku']));
                    (listItem['Lineitem requires shipping'] != '') && (modelInfo.limitItemRequiresShipping = listItem['Lineitem requires shipping']);
                    (listItem['Lineitem taxable'] != '') && (modelInfo.limitItemTaxable = listItem['Lineitem taxable']);
                    (listItem['Lineitem fulfillment status'] != '') && (modelInfo.limitItemFulfillmentStatus = listItem['Lineitem fulfillment status']);
                    (listItem['Billing Name'] != '') && (modelInfo.billingName = listItem['Billing Name']);
                    (listItem['Billing Street'] != '') && (modelInfo.billingStreet = listItem['Billing Street']);
                    (listItem['Billing Address1'] != '') && (modelInfo.billingAddress1 = listItem['Billing Address1']);
                    (listItem['Billing Address2'] != '') && (modelInfo.billingAddress2 = listItem['Billing Address2']);
                    (listItem['Billing Company'] != '') && (modelInfo.billingCompany = listItem['Billing Company']);
                    (listItem['Billing City'] != '') && (modelInfo.billingCity = listItem['Billing City']);
                    (listItem['Billing Zip'] != '') && (modelInfo.billingZip = listItem['Billing Zip']);
                    (listItem['Billing Province'] != '') && (modelInfo.billingProvince = listItem['Billing Province']);
                    (listItem['Billing Country'] != '') && (modelInfo.billingCountry = listItem['Billing Country']);
                    (listItem['Billing Phone'] != '') && (modelInfo.billingPhone = listItem['Billing Phone']);
                    (listItem['Shipping Name'] != '') && (modelInfo.shippingName = listItem['Shipping Name']);
                    (listItem['Shipping Street'] != '') && (modelInfo.shippingStreet = listItem['Shipping Street']);
                    (listItem['Shipping Address1'] != '') && (modelInfo.shippingAddress1 = listItem['Shipping Address1']);
                    (listItem['Shipping Address2'] != '') && (modelInfo.shippingAddress2 = listItem['Shipping Address2']);
                    (listItem['Shipping Company'] != '') && (modelInfo.shippingCompany = listItem['Shipping Company']);
                    (listItem['Shipping City'] != '') && (modelInfo.shippingCity = listItem['Shipping City']);
                    (listItem['Shipping Zip'] != '') && (modelInfo.shippingZip = listItem['Shipping Zip']);
                    (listItem['Shipping Province'] != '') && (modelInfo.shippingProvince = listItem['Shipping Province']);
                    (listItem['Shipping Country'] != '') && (modelInfo.shippingCountry = listItem['Shipping Country']);
                    (listItem['Shipping Phone'] != '') && (modelInfo.shippingPhone = listItem['Shipping Phone']);
                    (listItem['Notes'] != '') && (modelInfo.notes = listItem['Notes']);
                    (listItem['Note Attributes'] != '') && (modelInfo.noteAttributes = listItem['Note Attributes']);
                    (listItem['Cancelled at'] != '') && (modelInfo.cancelledAt = new Date(listItem['Cancelled at']));
                    (listItem['Payment Method'] != '') && (modelInfo.paymentMethod = listItem['Payment Method']);
                    (listItem['Payment Reference'] != '') && (modelInfo.paymentReference = listItem['Payment Reference']);
                    (listItem['Refunded Amount'] != '') && (modelInfo.refundedAmount = parseFloat(listItem['Refunded Amount']));
                    (listItem['Vendor'] != '') && (modelInfo.vendor = listItem['Vendor']);
                    (listItem['Id'] != '') && (modelInfo.id = listItem['Id']);
                    (listItem['Tags'] != '') && (modelInfo.tags = listItem['Tags']);
                    (listItem['Risk Level'] != '') && (modelInfo.riskLevel = listItem['Risk Level']);
                    (listItem['Source'] != '') && (modelInfo.source = listItem['Source']);
                    (listItem['Lineitem discount'] != '') && (modelInfo.lineItemDiscount = parseFloat(listItem['Lineitem discount']));
                    (listItem['Tax 1 Name'] != '') && (modelInfo.tax1Name = listItem['Tax 1 Name']);
                    (listItem['Tax 1 Value'] != '') && (modelInfo.tax1Value = listItem['Tax 1 Value']);
                    (listItem['Tax 2 Name'] != '') && (modelInfo.tax2Name = listItem['Tax 2 Name']);
                    (listItem['Tax 2 Value'] != '') && (modelInfo.tax2Value = listItem['Tax 2 Value']);
                    (listItem['Tax 3 Name'] != '') && (modelInfo.tax3Name = listItem['Tax 3 Name']);
                    (listItem['Tax 3 Value'] != '') && (modelInfo.tax3Value = listItem['Tax 3 Value']);
                    (listItem['Tax 4 Name'] != '') && (modelInfo.tax4Name = listItem['Tax 4 Name']);
                    (listItem['Tax 4 Value'] != '') && (modelInfo.tax4Value = listItem['Tax 4 Value']);
                    (listItem['Tax 5 Name'] != '') && (modelInfo.tax5Name = listItem['Tax 5 Name']);
                    (listItem['Tax 5 Value'] != '') && (modelInfo.tax5Value = listItem['Tax 5 Value']);
                    (listItem['Phone'] != '') && (modelInfo.phone = listItem['Phone']);
                    (listItem['Receipt Number'] != '') && (modelInfo.receiptNumber = listItem['Receipt Number']);
                    (listItem['Duties'] != '') && (modelInfo.duties = listItem['Duties']);
                    (listItem['Billing Province Name'] != '') && (modelInfo.billingProvinceName = listItem['Billing Province Name']);
                    (listItem['Shipping Province Name'] != '') && (modelInfo.shippingProvinceName = listItem['Shipping Province Name']);
                    (listItem['Payment ID'] != '') && (modelInfo.paymentID = listItem['Payment ID']);
                    (listItem['Payment Terms Name'] != '') && (modelInfo.paymentTermsName = listItem['Payment Terms Name']);
                    (listItem['Next Payment Due At'] != '') && (modelInfo.nextPaymentDueAt = listItem['Next Payment Due At']);
                    return modelInfo;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseDiscountsExport');
            return undefined;
        }
    }

    /**
     * @param data - file 'shopify/products_export_1csv' in input as Buffer
     */
    static async parseProductsExport(data: Buffer): Promise<ProductsExportsSH | undefined> {
        try {let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: ProductsExportsSH = {list: []}
                model.list = result.map((listItem: any) => {
                    let modelInfo: ProductExportSH = {};
                    (listItem['Handle'] != '') && (modelInfo.handle = listItem['Handle']);
                    (listItem['Title'] != '') && (modelInfo.title = listItem['Title']);
                    (listItem['Body (HTML)'] != '') && (modelInfo.bodyHTML = listItem['Body (HTML)']);
                    (listItem['Vendor'] != '') && (modelInfo.vendor = listItem['Vendor']);
                    (listItem['Standardized Product Type'] != '') && (modelInfo.standardProductType = listItem['Standardized Product Type']);
                    (listItem['Custom Product Type'] != '') && (modelInfo.customProductType = listItem['Custom Product Type']);
                    (listItem['Tags'] != '') && (modelInfo.tags = listItem['Tags']);
                    (listItem['Published'] != '') && (modelInfo.published = listItem['Published'].toLowerCase() === 'true');
                    (listItem['Option1 Name'] != '') && (modelInfo.option1Name = listItem['Option1 Name']);
                    (listItem['Option1 Value'] != '') && (modelInfo.option1Value = listItem['Option1 Value']);
                    (listItem['Option2 Name'] != '') && (modelInfo.option2Name = listItem['Option2 Name']);
                    (listItem['Option2 Value'] != '') && (modelInfo.option2Value = listItem['Option2 Value']);
                    (listItem['Option3 Name'] != '') && (modelInfo.option3Name = listItem['Option3 Name']);
                    (listItem['Option3 Value'] != '') && (modelInfo.option3Value = listItem['Option3 Value']);
                    (listItem['Variant SKU'] != '') && (modelInfo.variantSKU = parseFloat(listItem['Variant SKU']));
                    (listItem['Variant Grams'] != '') && (modelInfo.variantGrams = parseFloat(listItem['Variant Grams']));
                    (listItem['Variant Inventory Tracker'] != '') && (modelInfo.variantInventoryTracker = listItem['Variant Inventory Tracker']);
                    (listItem['Variant Inventory Qty'] != '') && (modelInfo.variantInventoryQty = parseFloat(listItem['Variant Inventory Qty']));
                    (listItem['Variant Inventory Policy'] != '') && (modelInfo.variantInventoryPolicy = listItem['Variant Inventory Policy']);
                    (listItem['Variant Fulfillment Service'] != '') && (modelInfo.variantFulfillmentService = listItem['Variant Fulfillment Service']);
                    (listItem['Variant Price'] != '') && (modelInfo.variantPrice = parseFloat(listItem['Variant Price']));
                    (listItem['Variant Compare At Price'] != '') && (modelInfo.variantCompareAtPrice = parseFloat(listItem['Variant Compare At Price']));
                    (listItem['Variant Requires Shipping'] != '') && (modelInfo.variantRequiresShipping = listItem['Variant Requires Shipping'].toLowerCase() === 'true');
                    (listItem['Variant Taxable'] != '') && (modelInfo.variantTaxable = listItem['Variant Taxable'].toLowerCase() === 'true');
                    (listItem['Variant Barcode'] != '') && (modelInfo.variantBarcode = listItem['Variant Barcode']);
                    (listItem['Image Src'] != '') && (modelInfo.imgSrc = listItem['Image Src']);
                    (listItem['Image Position'] != '') && (modelInfo.imgPosition = listItem['Image Position']);
                    (listItem['Image Alt Text'] != '') && (modelInfo.imgAltText = listItem['Image Alt Text']);
                    (listItem['Gift Card'] != '') && (modelInfo.giftCard = listItem['Gift Card'].toLowerCase() === 'true');
                    (listItem['SEO Title'] != '') && (modelInfo.SEOTitle = listItem['SEO Title']);
                    (listItem['SEO Description'] != '') && (modelInfo.SEODescription = listItem['SEO Description']);
                    (listItem['Google Shopping / Google Product Category'] != '') && (modelInfo.googleShoppingProductCategory = listItem['Google Shopping / Google Product Category']);
                    (listItem['Google Shopping / Gender'] != '') && (modelInfo.googleShoppingGender = listItem['Google Shopping / Gender']);
                    (listItem['Google Shopping / Age Group'] != '') && (modelInfo.googleShoppingAgeGroup = listItem['Google Shopping / Age Group']);
                    (listItem['Google Shopping / MPN'] != '') && (modelInfo.googleShoppingMPN = listItem['Google Shopping / MPN']);
                    (listItem['Google Shopping / AdWords Grouping'] != '') && (modelInfo.googleShoppingAdWordsGrouping = listItem['Google Shopping / AdWords Grouping']);
                    (listItem['Google Shopping / AdWords Labels'] != '') && (modelInfo.googleShoppingAdWordsLabels = listItem['Google Shopping / AdWords Labels']);
                    (listItem['Google Shopping / Condition'] != '') && (modelInfo.googleShoppingCondition = listItem['Google Shopping / Condition']);
                    (listItem['Google Shopping / Custom Product'] != '') && (modelInfo.googleShoppingCustomProduct = listItem['Google Shopping / Custom Product']);
                    (listItem['Google Shopping / Custom Label 0'] != '') && (modelInfo.googleShoppingLabel0 = listItem['Google Shopping / Custom Label 0']);
                    (listItem['Google Shopping / Custom Label 1'] != '') && (modelInfo.googleShoppingLabel1 = listItem['Google Shopping / Custom Label 1']);
                    (listItem['Google Shopping / Custom Label 2'] != '') && (modelInfo.googleShoppingLabel2 = listItem['Google Shopping / Custom Label 2']);
                    (listItem['Google Shopping / Custom Label 3'] != '') && (modelInfo.googleShoppingLabel3 = listItem['Google Shopping / Custom Label 3']);
                    (listItem['Google Shopping / Custom Label 4'] != '') && (modelInfo.googleShoppingLabel4 = listItem['Google Shopping / Custom Label 4']);
                    (listItem['Variant Image'] != '') && (modelInfo.variantImage = listItem['Variant Image']);
                    (listItem['Variant Weight Unit'] != '') && (modelInfo.variantWeightUnit = listItem['Variant Weight Unit']);
                    (listItem['Variant Tax Code'] != '') && (modelInfo.variantTaxCode = listItem['Variant Tax Code']);
                    (listItem['Cost per item'] != '') && (modelInfo.costPerItem = parseFloat(listItem['Cost per item']));
                    (listItem['Status'] != '') && (modelInfo.status = listItem['Status']);
                    return modelInfo;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseDiscountsExport');
            return undefined;
        }
    }
}
