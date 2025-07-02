"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageInfoResParams = exports.QueryBase = exports.GenerateShortLinkResParams = exports.GenerateShortLink = exports.Mutations = exports.ReportPageInfoResParams = exports.ReportNode = exports.ValidatedReport = exports.ConversionReportCampaignType = exports.ConversionReportFraudStatus = exports.ConversionReportDevice = exports.ConversionReportAttributionType = exports.ConversionReportBuyerType = exports.ConversionReportOrderStatus = exports.ConversionReportShopType = exports.ConversionReport = exports.ShopeeOfferV2SortType = exports.ShopeeOfferV2Node = exports.ShopeeOfferV2 = exports.ShopOfferV2ShopType = exports.ShopOfferV2SortType = exports.ShopOfferV2Node = exports.ShopOfferV2 = exports.ProductOfferV2ListType = exports.ProductOfferV2SortType = exports.ProductOfferV2Node = exports.ProductOfferV2 = exports.Queries = exports.SaAPIErrorCode = exports.SaAPIError = exports.Country = exports.Authentication = exports.SaAPI = void 0;
// Main exports
var saapi_1 = require("./saapi");
Object.defineProperty(exports, "SaAPI", { enumerable: true, get: function () { return saapi_1.SaAPI; } });
var authentication_1 = require("./authentication");
Object.defineProperty(exports, "Authentication", { enumerable: true, get: function () { return authentication_1.Authentication; } });
var countries_1 = require("./countries");
Object.defineProperty(exports, "Country", { enumerable: true, get: function () { return countries_1.Country; } });
var errors_1 = require("./errors");
Object.defineProperty(exports, "SaAPIError", { enumerable: true, get: function () { return errors_1.SaAPIError; } });
Object.defineProperty(exports, "SaAPIErrorCode", { enumerable: true, get: function () { return errors_1.SaAPIErrorCode; } });
// Query exports
var queries_1 = require("./queries/queries");
Object.defineProperty(exports, "Queries", { enumerable: true, get: function () { return queries_1.Queries; } });
var productOfferV2_1 = require("./queries/productOfferV2");
Object.defineProperty(exports, "ProductOfferV2", { enumerable: true, get: function () { return productOfferV2_1.ProductOfferV2; } });
Object.defineProperty(exports, "ProductOfferV2Node", { enumerable: true, get: function () { return productOfferV2_1.ProductOfferV2Node; } });
Object.defineProperty(exports, "ProductOfferV2SortType", { enumerable: true, get: function () { return productOfferV2_1.ProductOfferV2SortType; } });
Object.defineProperty(exports, "ProductOfferV2ListType", { enumerable: true, get: function () { return productOfferV2_1.ProductOfferV2ListType; } });
var shopOfferV2_1 = require("./queries/shopOfferV2");
Object.defineProperty(exports, "ShopOfferV2", { enumerable: true, get: function () { return shopOfferV2_1.ShopOfferV2; } });
Object.defineProperty(exports, "ShopOfferV2Node", { enumerable: true, get: function () { return shopOfferV2_1.ShopOfferV2Node; } });
Object.defineProperty(exports, "ShopOfferV2SortType", { enumerable: true, get: function () { return shopOfferV2_1.ShopOfferV2SortType; } });
Object.defineProperty(exports, "ShopOfferV2ShopType", { enumerable: true, get: function () { return shopOfferV2_1.ShopOfferV2ShopType; } });
var shopeeOfferV2_1 = require("./queries/shopeeOfferV2");
Object.defineProperty(exports, "ShopeeOfferV2", { enumerable: true, get: function () { return shopeeOfferV2_1.ShopeeOfferV2; } });
Object.defineProperty(exports, "ShopeeOfferV2Node", { enumerable: true, get: function () { return shopeeOfferV2_1.ShopeeOfferV2Node; } });
Object.defineProperty(exports, "ShopeeOfferV2SortType", { enumerable: true, get: function () { return shopeeOfferV2_1.ShopeeOfferV2SortType; } });
var conversionReport_1 = require("./queries/conversionReport");
Object.defineProperty(exports, "ConversionReport", { enumerable: true, get: function () { return conversionReport_1.ConversionReport; } });
Object.defineProperty(exports, "ConversionReportShopType", { enumerable: true, get: function () { return conversionReport_1.ConversionReportShopType; } });
Object.defineProperty(exports, "ConversionReportOrderStatus", { enumerable: true, get: function () { return conversionReport_1.ConversionReportOrderStatus; } });
Object.defineProperty(exports, "ConversionReportBuyerType", { enumerable: true, get: function () { return conversionReport_1.ConversionReportBuyerType; } });
Object.defineProperty(exports, "ConversionReportAttributionType", { enumerable: true, get: function () { return conversionReport_1.ConversionReportAttributionType; } });
Object.defineProperty(exports, "ConversionReportDevice", { enumerable: true, get: function () { return conversionReport_1.ConversionReportDevice; } });
Object.defineProperty(exports, "ConversionReportFraudStatus", { enumerable: true, get: function () { return conversionReport_1.ConversionReportFraudStatus; } });
Object.defineProperty(exports, "ConversionReportCampaignType", { enumerable: true, get: function () { return conversionReport_1.ConversionReportCampaignType; } });
var validatedReport_1 = require("./queries/validatedReport");
Object.defineProperty(exports, "ValidatedReport", { enumerable: true, get: function () { return validatedReport_1.ValidatedReport; } });
var reportQueryBase_1 = require("./queries/reportQueryBase");
Object.defineProperty(exports, "ReportNode", { enumerable: true, get: function () { return reportQueryBase_1.ReportNode; } });
Object.defineProperty(exports, "ReportPageInfoResParams", { enumerable: true, get: function () { return reportQueryBase_1.ReportPageInfoResParams; } });
// Mutation exports
var mutations_1 = require("./mutations/mutations");
Object.defineProperty(exports, "Mutations", { enumerable: true, get: function () { return mutations_1.Mutations; } });
var generateShortLink_1 = require("./mutations/generateShortLink");
Object.defineProperty(exports, "GenerateShortLink", { enumerable: true, get: function () { return generateShortLink_1.GenerateShortLink; } });
Object.defineProperty(exports, "GenerateShortLinkResParams", { enumerable: true, get: function () { return generateShortLink_1.GenerateShortLinkResParams; } });
// Base exports
var queryBase_1 = require("./queryBase");
Object.defineProperty(exports, "QueryBase", { enumerable: true, get: function () { return queryBase_1.QueryBase; } });
Object.defineProperty(exports, "PageInfoResParams", { enumerable: true, get: function () { return queryBase_1.PageInfoResParams; } });
//# sourceMappingURL=index.js.map