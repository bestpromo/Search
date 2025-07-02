import { ReportQueryBase, ReportQueryParamsBase, ReportNode, ReportPageInfoResParams } from './reportQueryBase';
import { Authentication } from '../authentication';

export enum ConversionReportShopType {
  ALL = "ALL",
  SHOPEE_MALL_CB = "SHOPEE_MALL_CB",
  SHOPEE_MALL_NON_CB = "SHOPEE_MALL_NON_CB",
  C2C_CB = "C2C_CB",
  C2C_NON_CB = "C2C_NON_CB",
  PREFERRED_CB = "PREFERRED_CB",
  PREFERRED_NON_CB = "PREFERRED_NON_CB"
}

export enum ConversionReportOrderStatus {
  ALL = "ALL",
  UNPAID = "UNPAID",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export enum ConversionReportBuyerType {
  ALL = "ALL",
  NEW = "NEW",
  EXISTING = "EXISTING"
}

export enum ConversionReportAttributionType {
  ORDER_IN_SAME_SHOP = "Ordered in Same Shop",
  ORDER_IN_DIFFERENT_SHOP = "Ordered in Different Shop"
}

export enum ConversionReportDevice {
  ALL = "ALL",
  APP = "APP",
  WEB = "WEB"
}

export enum ConversionReportFraudStatus {
  ALL = "ALL",
  UNVERIFIED = "UNVERIFIED",
  VERIFIED = "VERIFIED",
  FRAUD = "FRAUD"
}

export enum ConversionReportCampaignType {
  ALL = "ALL",
  SELLER_OPEN_CAMPAIGN = "Seller Open Campaign",
  SELLER_TARGET_CAMPAIGN = "Seller Target Campaign",
  MCN_CAMPAIGN = "MCN Campaign",
  NON_SELLER_CAMPAIGN = "Non-Seller Campaign"
}

export interface ConversionReportQueryParams extends ReportQueryParamsBase {
  purchaseTimeStart?: number;
  purchaseTimeEnd?: number;
  completeTimeStart?: number;
  completeTimeEnd?: number;
  shopName?: string;
  shopId?: number;
  shopType?: string[];
  conversionId?: number;
  orderId?: string;
  productName?: string;
  productId?: number;
  categoryLv1Id?: number;
  categoryLv2Id?: number;
  categoryLv3Id?: number;
  orderStatus?: string;
  buyerType?: string;
  attributionType?: string;
  device?: string;
  fraudStatus?: string;
  campaignPartnerName?: string;
  campaignType?: string;
}

export interface ConversionReportResParams {
  nodes: (ReportNode | string)[];
  pageInfo?: (ReportPageInfoResParams | string)[];
}

export class ConversionReport extends ReportQueryBase {
  get queryName(): string {
    return "conversionReport";
  }

  get queryParams(): Record<string, any> {
    return {
      purchaseTimeStart: null,
      purchaseTimeEnd: null,
      completeTimeStart: null,
      completeTimeEnd: null,
      shopName: null,
      shopId: null,
      shopType: null,
      conversionId: null,
      orderId: null,
      productName: null,
      productId: null,
      categoryLv1Id: null,
      categoryLv2Id: null,
      categoryLv3Id: null,
      orderStatus: null,
      buyerType: null,
      attributionType: null,
      device: null,
      fraudStatus: null,
      campaignPartnerName: null,
      campaignType: null,
      limit: 20,
      scrollId: null
    };
  }

  get resParams(): Record<string, any> {
    return {
      nodes: Object.values(ReportNode),
      pageInfo: Object.values(ReportPageInfoResParams)
    };
  }

  constructor(url: string, auth: Authentication) {
    super(url, auth);
  }

  async makeRequest(
    params: ConversionReportQueryParams,
    resParams: ConversionReportResParams
  ): Promise<any> {
    return super._makeRequest(params, resParams);
  }
}
