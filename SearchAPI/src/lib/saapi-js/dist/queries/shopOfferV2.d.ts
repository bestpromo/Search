import { QueryBase, QueryParamsBase, PageInfoResParams } from '../queryBase';
import { Authentication } from '../authentication';
export declare enum ShopOfferV2ShopType {
    OFFICIAL_SHOP = 1,
    PREFERRED_SHOP = 2,
    PREFERRED_PLUS_SHOP = 4
}
export declare enum ShopOfferV2SortType {
    SHOP_LIST_SORT_TYPE_LATEST_DESC = 1,
    SHOP_LIST_SORT_TYPE_HIGHEST_COMMISSION_DESC = 2,
    SHOP_LIST_SORT_TYPE_POPULAR_SHOP_DESC = 3
}
export interface ShopOfferV2QueryParams extends QueryParamsBase {
    shopId?: number;
    shopType?: number[];
    isKeySeller?: boolean;
    sellerCommCoveRatio?: string;
}
export declare enum ShopOfferV2Node {
    commissionRate = "commissionRate",
    imageUrl = "imageUrl",
    offerLink = "offerLink",
    originalLink = "originalLink",
    shopId = "shopId",
    shopName = "shopName",
    ratingStar = "ratingStar",
    shopType = "shopType",
    remainingBudget = "remainingBudget",
    periodStartTime = "periodStartTime",
    periodEndTime = "periodEndTime",
    sellerCommCoveRatio = "sellerCommCoveRatio",
    bannerInfo = "bannerInfo"
}
export interface ShopOfferV2ResParams {
    nodes: (ShopOfferV2Node | string)[];
    pageInfo?: (PageInfoResParams | string)[];
}
export declare class ShopOfferV2 extends QueryBase {
    get queryName(): string;
    get queryParams(): Record<string, any>;
    get resParams(): Record<string, any>;
    constructor(url: string, auth: Authentication);
    makeRequest(params: ShopOfferV2QueryParams, resParams: ShopOfferV2ResParams): Promise<any>;
}
//# sourceMappingURL=shopOfferV2.d.ts.map