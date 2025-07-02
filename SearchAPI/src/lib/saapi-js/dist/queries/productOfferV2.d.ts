import { QueryBase, QueryParamsBase, PageInfoResParams } from '../queryBase';
import { Authentication } from '../authentication';
export declare enum ProductOfferV2ListType {
    HIGHEST_COMMISSION = 1,
    TOP_PERFORMING = 2,
    LANDING_CATEGORY = 3,
    DETAIL_CATEGORY = 4,
    DETAIL_SHOP = 5
}
export declare enum ProductOfferV2SortType {
    RELEVANCE_DESC = 1,
    ITEM_SOLD_DESC = 2,
    PRICE_DESC = 3,
    PRICE_ASC = 4,
    COMMISSION_DESC = 5
}
export interface ProductOfferV2QueryParams extends QueryParamsBase {
    shopId?: number;
    itemId?: number;
    productCatId?: number;
    listType?: number;
    matchId?: number;
    isAMSOffer?: boolean;
    isKeySeller?: boolean;
}
export declare enum ProductOfferV2Node {
    itemId = "itemId",
    commissionRate = "commissionRate",
    sellerCommissionRate = "sellerCommissionRate",
    shopeeCommissionRate = "shopeeCommissionRate",
    commission = "commission",
    sales = "sales",
    priceMax = "priceMax",
    priceMin = "priceMin",
    productCatIds = "productCatIds",
    ratingStar = "ratingStar",
    priceDiscountRate = "priceDiscountRate",
    imageUrl = "imageUrl",
    productName = "productName",
    shopId = "shopId",
    shopName = "shopName",
    shopType = "shopType",
    productLink = "productLink",
    offerLink = "offerLink",
    periodStartTime = "periodStartTime",
    periodEndTime = "periodEndTime"
}
export interface ProductOfferV2ResParams {
    nodes: (ProductOfferV2Node | string)[];
    pageInfo?: (PageInfoResParams | string)[];
}
export declare class ProductOfferV2 extends QueryBase {
    get queryName(): string;
    get queryParams(): Record<string, any>;
    get resParams(): Record<string, any>;
    constructor(url: string, auth: Authentication);
    makeRequest(params: ProductOfferV2QueryParams, resParams: ProductOfferV2ResParams): Promise<any>;
}
//# sourceMappingURL=productOfferV2.d.ts.map