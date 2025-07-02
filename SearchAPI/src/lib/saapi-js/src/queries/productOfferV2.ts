import { QueryBase, QueryParamsBase, PageInfoResParams } from '../queryBase';
import { Authentication } from '../authentication';

export enum ProductOfferV2ListType {
  HIGHEST_COMMISSION = 1,
  TOP_PERFORMING = 2,
  LANDING_CATEGORY = 3,
  DETAIL_CATEGORY = 4,
  DETAIL_SHOP = 5
}

export enum ProductOfferV2SortType {
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

export enum ProductOfferV2Node {
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

export class ProductOfferV2 extends QueryBase {
  get queryName(): string {
    return "productOfferV2";
  }

  get queryParams(): Record<string, any> {
    return {
      shopId: null,
      itemId: null,
      productCatId: null,
      listType: null,
      matchId: null,
      isAMSOffer: null,
      isKeySeller: null,
      keyword: "",
      sortType: 1,
      page: 1,
      limit: 20
    };
  }

  get resParams(): Record<string, any> {
    return {
      nodes: Object.values(ProductOfferV2Node),
      pageInfo: Object.values(PageInfoResParams)
    };
  }

  constructor(url: string, auth: Authentication) {
    super(url, auth);
  }

  async makeRequest(
    params: ProductOfferV2QueryParams,
    resParams: ProductOfferV2ResParams
  ): Promise<any> {
    return super._makeRequest(params, resParams);
  }
}
