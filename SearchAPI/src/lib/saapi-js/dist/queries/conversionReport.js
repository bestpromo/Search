"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionReport = exports.ConversionReportCampaignType = exports.ConversionReportFraudStatus = exports.ConversionReportDevice = exports.ConversionReportAttributionType = exports.ConversionReportBuyerType = exports.ConversionReportOrderStatus = exports.ConversionReportShopType = void 0;
const reportQueryBase_1 = require("./reportQueryBase");
var ConversionReportShopType;
(function (ConversionReportShopType) {
    ConversionReportShopType["ALL"] = "ALL";
    ConversionReportShopType["SHOPEE_MALL_CB"] = "SHOPEE_MALL_CB";
    ConversionReportShopType["SHOPEE_MALL_NON_CB"] = "SHOPEE_MALL_NON_CB";
    ConversionReportShopType["C2C_CB"] = "C2C_CB";
    ConversionReportShopType["C2C_NON_CB"] = "C2C_NON_CB";
    ConversionReportShopType["PREFERRED_CB"] = "PREFERRED_CB";
    ConversionReportShopType["PREFERRED_NON_CB"] = "PREFERRED_NON_CB";
})(ConversionReportShopType || (exports.ConversionReportShopType = ConversionReportShopType = {}));
var ConversionReportOrderStatus;
(function (ConversionReportOrderStatus) {
    ConversionReportOrderStatus["ALL"] = "ALL";
    ConversionReportOrderStatus["UNPAID"] = "UNPAID";
    ConversionReportOrderStatus["PENDING"] = "PENDING";
    ConversionReportOrderStatus["COMPLETED"] = "COMPLETED";
    ConversionReportOrderStatus["CANCELLED"] = "CANCELLED";
})(ConversionReportOrderStatus || (exports.ConversionReportOrderStatus = ConversionReportOrderStatus = {}));
var ConversionReportBuyerType;
(function (ConversionReportBuyerType) {
    ConversionReportBuyerType["ALL"] = "ALL";
    ConversionReportBuyerType["NEW"] = "NEW";
    ConversionReportBuyerType["EXISTING"] = "EXISTING";
})(ConversionReportBuyerType || (exports.ConversionReportBuyerType = ConversionReportBuyerType = {}));
var ConversionReportAttributionType;
(function (ConversionReportAttributionType) {
    ConversionReportAttributionType["ORDER_IN_SAME_SHOP"] = "Ordered in Same Shop";
    ConversionReportAttributionType["ORDER_IN_DIFFERENT_SHOP"] = "Ordered in Different Shop";
})(ConversionReportAttributionType || (exports.ConversionReportAttributionType = ConversionReportAttributionType = {}));
var ConversionReportDevice;
(function (ConversionReportDevice) {
    ConversionReportDevice["ALL"] = "ALL";
    ConversionReportDevice["APP"] = "APP";
    ConversionReportDevice["WEB"] = "WEB";
})(ConversionReportDevice || (exports.ConversionReportDevice = ConversionReportDevice = {}));
var ConversionReportFraudStatus;
(function (ConversionReportFraudStatus) {
    ConversionReportFraudStatus["ALL"] = "ALL";
    ConversionReportFraudStatus["UNVERIFIED"] = "UNVERIFIED";
    ConversionReportFraudStatus["VERIFIED"] = "VERIFIED";
    ConversionReportFraudStatus["FRAUD"] = "FRAUD";
})(ConversionReportFraudStatus || (exports.ConversionReportFraudStatus = ConversionReportFraudStatus = {}));
var ConversionReportCampaignType;
(function (ConversionReportCampaignType) {
    ConversionReportCampaignType["ALL"] = "ALL";
    ConversionReportCampaignType["SELLER_OPEN_CAMPAIGN"] = "Seller Open Campaign";
    ConversionReportCampaignType["SELLER_TARGET_CAMPAIGN"] = "Seller Target Campaign";
    ConversionReportCampaignType["MCN_CAMPAIGN"] = "MCN Campaign";
    ConversionReportCampaignType["NON_SELLER_CAMPAIGN"] = "Non-Seller Campaign";
})(ConversionReportCampaignType || (exports.ConversionReportCampaignType = ConversionReportCampaignType = {}));
class ConversionReport extends reportQueryBase_1.ReportQueryBase {
    get queryName() {
        return "conversionReport";
    }
    get queryParams() {
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
    get resParams() {
        return {
            nodes: Object.values(reportQueryBase_1.ReportNode),
            pageInfo: Object.values(reportQueryBase_1.ReportPageInfoResParams)
        };
    }
    constructor(url, auth) {
        super(url, auth);
    }
    async makeRequest(params, resParams) {
        return super._makeRequest(params, resParams);
    }
}
exports.ConversionReport = ConversionReport;
//# sourceMappingURL=conversionReport.js.map