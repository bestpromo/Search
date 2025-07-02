import { QueryBase, QueryParamsBase, PageInfoResParams } from '../queryBase';
import { Authentication } from '../authentication';
export declare enum ShopeeOfferV2SortType {
    LATEST_DESC = 1,
    HIGHEST_COMMISSION_DESC = 2
}
export interface ShopeeOfferV2QueryParams extends QueryParamsBase {
}
export declare enum ShopeeOfferV2Node {
    commissionRate = "commissionRate",
    imageUrl = "imageUrl",
    offerLink = "offerLink",
    originalLink = "originalLink",
    offerName = "offerName",
    offerType = "offerType",
    categoryId = "categoryId",
    collectionId = "collectionId",
    periodStartTime = "periodStartTime",
    periodEndTime = "periodEndTime"
}
export interface ShopeeOfferV2ResParams {
    nodes: (ShopeeOfferV2Node | string)[];
    pageInfo?: (PageInfoResParams | string)[];
}
export declare class ShopeeOfferV2 extends QueryBase {
    get queryName(): string;
    get queryParams(): Record<string, any>;
    get resParams(): Record<string, any>;
    constructor(url: string, auth: Authentication);
    makeRequest(params: ShopeeOfferV2QueryParams, resParams: ShopeeOfferV2ResParams): Promise<any>;
}
//# sourceMappingURL=shopeeOfferV2.d.ts.map