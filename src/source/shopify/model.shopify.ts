export interface CustomersExportsSH {
    list: CustomerExportSH[];
}

export interface CustomerExportSH {
    firstName?: string;
    lastName?: string;
    email?: string;
    acceptsEmailMarketing?: boolean;
    company?: string;
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    provinceCode?: string;
    country?: string;
    countryCode?: string;
    zipCode?: string;
    phone?: string;
    acceptsSMSMarketing?: boolean;
    totalSpent?: number;
    totalOrders?: number;
    tags?: string;
    note?: string;
    taxExempt?: boolean;
}

export interface DiscountsExportsSH {
    list: DiscountExportSH[];
}

export interface DiscountExportSH {
    name?: string;
    value?: number;
    valueType?: string;
    timeUsedInTotal?: number;
    usageLimitPerCode?: number;
    status?: string;
    start?: Date;
    end?: Date;
}

export interface OrdersExportsSH {
    list: OrderExportSH[];
}

export interface OrderExportSH {
    name?: string;
    email?: string;
    financialStudio?: string;
    paidAt?: Date;
    fulfillmentStatus?: string;
    fulfillmentAt?: Date;
    acceptMarketing?: boolean;
    currency?: string;
    subtotal?: number;
    shipping?: number;
    taxes?: number;
    total?: number;
    discountCode?: string;
    discountAmount?: number;
    shippingMethod?: string;
    createdAt?: Date;
    limitItemQuantity?: number;
    limitItemName?: string;
    limitItemPrice?: number;
    limitItemCompareAtPrice?: number;
    limitItemSku?: number;
    limitItemRequiresShipping?: string;
    limitItemTaxable?: string;
    limitItemFulfillmentStatus?: string;
    billingName?: string;
    billingStreet?: string;
    billingAddress1?: string;
    billingAddress2?: string;
    billingCompany?: string;
    billingCity?: string;
    billingZip?: string;
    billingProvince?: string;
    billingCountry?: string;
    billingPhone?: string;
    shippingName?: string;
    shippingStreet?: string;
    shippingAddress1?: string;
    shippingAddress2?: string;
    shippingCompany?: string;
    shippingCity?: string;
    shippingZip?: string;
    shippingProvince?: string;
    shippingCountry?: string;
    shippingPhone?: string;
    notes?: string;
    noteAttributes?: string;
    cancelledAt?: Date;
    paymentMethod?: string;
    paymentReference?: string;
    refundedAmount?: number;
    vendor?: string;
    id?: string;
    tags?: string;
    riskLevel?: string;
    source?: string;
    lineItemDiscount?: number;
    tax1Name?: string;
    tax2Name?: string;
    tax3Name?: string;
    tax4Name?: string;
    tax5Name?: string;
    tax1Value?: string;
    tax2Value?: string;
    tax3Value?: string;
    tax4Value?: string;
    tax5Value?: string;
    phone?: string;
    receiptNumber?: string;
    duties?: string;
    billingProvinceName?: string;
    shippingProvinceName?: string;
    paymentID?: string;
    paymentTermsName?: string;
    nextPaymentDueAt?: string;
}

export interface ProductsExportsSH {
    list: ProductExportSH[];
}

export interface ProductExportSH {
    handle?: string;
    title?: string;
    bodyHTML?: string;
    vendor?: string;
    standardProductType?: string;
    customProductType?: string;
    tags?: string;
    published?: boolean;
    option1Name?: string;
    option2Name?: string;
    option3Name?: string;
    option1Value?: string;
    option2Value?: string;
    option3Value?: string;
    variantSKU?: number;
    variantGrams?: number;
    variantInventoryTracker?: string;
    variantInventoryQty?: number;
    variantInventoryPolicy?: string;
    variantFulfillmentService?: string;
    variantPrice?: number;
    variantCompareAtPrice?: number;
    variantRequiresShipping?: boolean;
    variantTaxable?: boolean;
    variantBarcode?: string;
    imgSrc?: string;
    imgPosition?: string;
    imgAltText?: string;
    giftCard?: boolean;
    SEOTitle?: string;
    SEODescription?: string;
    googleShoppingProductCategory?: string;
    googleShoppingGender?: string;
    googleShoppingAgeGroup?: string;
    googleShoppingMPN?: string;
    googleShoppingAdWordsGrouping?: string;
    googleShoppingAdWordsLabels?: string;
    googleShoppingCondition?: string;
    googleShoppingCustomProduct?: string;
    googleShoppingLabel0?: string;
    googleShoppingLabel1?: string;
    googleShoppingLabel2?: string;
    googleShoppingLabel3?: string;
    googleShoppingLabel4?: string;
    variantImage?: string;
    variantWeightUnit?: string;
    variantTaxCode?: string;
    costPerItem?: number;
    status?: string;
}
