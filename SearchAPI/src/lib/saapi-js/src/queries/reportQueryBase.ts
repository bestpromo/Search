import { QueryBase } from '../queryBase';
import { Authentication } from '../authentication';

export enum ReportPageInfoResParams {
  limit = "limit",
  hasNextPage = "hasNextPage",
  scrollId = "scrollId"
}

export enum ReportNode {
  purchaseTime = "purchaseTime",
  clickTime = "clickTime",
  conversionId = "conversionId",
  shopeeCommission_capped = "shopeeCommissionCapped",
  sellerCommission = "sellerCommission",
  totalCommission = "totalCommission",
  buyerType = "buyerType",
  utmContent = "utmContent",
  device = "device",
  referrer = "referrer",
  orders = "orders",
  linkedMcnName = "linkedMcnName",
  mcnContractId = "mcnContractId",
  mcnManagementFeeRate = "mcnManagementFeeRate",
  mcnManagementFee = "mcnManagementFee",
  netCommission = "netCommission",
  campaignType = "campaignType"
}

export interface ReportQueryParamsBase {
  limit?: number;
  scrollId?: string;
}

export abstract class ReportQueryBase extends QueryBase {
  constructor(url: string, auth: Authentication) {
    super(url, auth);
  }
}
