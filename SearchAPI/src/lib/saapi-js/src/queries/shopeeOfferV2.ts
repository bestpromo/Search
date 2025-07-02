import { QueryBase, QueryParamsBase, PageInfoResParams } from '../queryBase';
import { Authentication } from '../authentication';

export enum ShopeeOfferV2SortType {
  LATEST_DESC = 1,
  HIGHEST_COMMISSION_DESC = 2
}

export interface ShopeeOfferV2QueryParams extends QueryParamsBase {
  // No additional parameters beyond base
}

export enum ShopeeOfferV2Node {
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

export class ShopeeOfferV2 extends QueryBase {
  get queryName(): string {
    return "shopeeOfferV2";
  }

  get queryParams(): Record<string, any> {
    return {
      keyword: "",
      sortType: 1,
      page: 1,
      limit: 20
    };
  }

  get resParams(): Record<string, any> {
    return {
      nodes: Object.values(ShopeeOfferV2Node),
      pageInfo: Object.values(PageInfoResParams)
    };
  }

  constructor(url: string, auth: Authentication) {
    super(url, auth);
  }

  async makeRequest(
    params: ShopeeOfferV2QueryParams,
    resParams: ShopeeOfferV2ResParams
  ): Promise<any> {
    return super._makeRequest(params, resParams);
  }
}
