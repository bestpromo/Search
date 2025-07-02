import { ReportQueryBase, ReportQueryParamsBase, ReportNode, ReportPageInfoResParams } from './reportQueryBase';
import { Authentication } from '../authentication';
export declare enum ConversionReportShopType {
    ALL = "ALL",
    SHOPEE_MALL_CB = "SHOPEE_MALL_CB",
    SHOPEE_MALL_NON_CB = "SHOPEE_MALL_NON_CB",
    C2C_CB = "C2C_CB",
    C2C_NON_CB = "C2C_NON_CB",
    PREFERRED_CB = "PREFERRED_CB",
    PREFERRED_NON_CB = "PREFERRED_NON_CB"
}
export declare enum ConversionReportOrderStatus {
    ALL = "ALL",
    UNPAID = "UNPAID",
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare enum ConversionReportBuyerType {
    ALL = "ALL",
    NEW = "NEW",
    EXISTING = "EXISTING"
}
export declare enum ConversionReportAttributionType {
    ORDER_IN_SAME_SHOP = "Ordered in Same Shop",
    ORDER_IN_DIFFERENT_SHOP = "Ordered in Different Shop"
}
export declare enum ConversionReportDevice {
    ALL = "ALL",
    APP = "APP",
    WEB = "WEB"
}
export declare enum ConversionReportFraudStatus {
    ALL = "ALL",
    UNVERIFIED = "UNVERIFIED",
    VERIFIED = "VERIFIED",
    FRAUD = "FRAUD"
}
export declare enum ConversionReportCampaignType {
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
export declare class ConversionReport extends ReportQueryBase {
    get queryName(): string;
    get queryParams(): Record<string, any>;
    get resParams(): Record<string, any>;
    constructor(url: string, auth: Authentication);
    makeRequest(params: ConversionReportQueryParams, resParams: ConversionReportResParams): Promise<any>;
}
//# sourceMappingURL=conversionReport.d.ts.map