"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportQueryBase = exports.ReportNode = exports.ReportPageInfoResParams = void 0;
const queryBase_1 = require("../queryBase");
var ReportPageInfoResParams;
(function (ReportPageInfoResParams) {
    ReportPageInfoResParams["limit"] = "limit";
    ReportPageInfoResParams["hasNextPage"] = "hasNextPage";
    ReportPageInfoResParams["scrollId"] = "scrollId";
})(ReportPageInfoResParams || (exports.ReportPageInfoResParams = ReportPageInfoResParams = {}));
var ReportNode;
(function (ReportNode) {
    ReportNode["purchaseTime"] = "purchaseTime";
    ReportNode["clickTime"] = "clickTime";
    ReportNode["conversionId"] = "conversionId";
    ReportNode["shopeeCommission_capped"] = "shopeeCommissionCapped";
    ReportNode["sellerCommission"] = "sellerCommission";
    ReportNode["totalCommission"] = "totalCommission";
    ReportNode["buyerType"] = "buyerType";
    ReportNode["utmContent"] = "utmContent";
    ReportNode["device"] = "device";
    ReportNode["referrer"] = "referrer";
    ReportNode["orders"] = "orders";
    ReportNode["linkedMcnName"] = "linkedMcnName";
    ReportNode["mcnContractId"] = "mcnContractId";
    ReportNode["mcnManagementFeeRate"] = "mcnManagementFeeRate";
    ReportNode["mcnManagementFee"] = "mcnManagementFee";
    ReportNode["netCommission"] = "netCommission";
    ReportNode["campaignType"] = "campaignType";
})(ReportNode || (exports.ReportNode = ReportNode = {}));
class ReportQueryBase extends queryBase_1.QueryBase {
    constructor(url, auth) {
        super(url, auth);
    }
}
exports.ReportQueryBase = ReportQueryBase;
//# sourceMappingURL=reportQueryBase.js.map