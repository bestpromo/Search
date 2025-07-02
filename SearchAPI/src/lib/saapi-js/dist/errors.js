"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaAPIError = exports.SaAPIErrorCode = void 0;
var SaAPIErrorCode;
(function (SaAPIErrorCode) {
    SaAPIErrorCode[SaAPIErrorCode["SYSTEM_ERROR"] = 10000] = "SYSTEM_ERROR";
    SaAPIErrorCode[SaAPIErrorCode["REQUEST_PARSING_ERROR"] = 10010] = "REQUEST_PARSING_ERROR";
    SaAPIErrorCode[SaAPIErrorCode["IDENTITY_AUTHENTICATION_ERROR"] = 10020] = "IDENTITY_AUTHENTICATION_ERROR";
    SaAPIErrorCode[SaAPIErrorCode["TRIGGER_TRAFFIC_LIMITING"] = 10030] = "TRIGGER_TRAFFIC_LIMITING";
    SaAPIErrorCode[SaAPIErrorCode["ACCESS_DENY"] = 10031] = "ACCESS_DENY";
    SaAPIErrorCode[SaAPIErrorCode["INVALID_AFFILIATE_ID"] = 10032] = "INVALID_AFFILIATE_ID";
    SaAPIErrorCode[SaAPIErrorCode["ACCOUNT_IS_FROZEN"] = 10033] = "ACCOUNT_IS_FROZEN";
    SaAPIErrorCode[SaAPIErrorCode["AFFILIATE_ID_BLACK_LIST"] = 10034] = "AFFILIATE_ID_BLACK_LIST";
    SaAPIErrorCode[SaAPIErrorCode["UNAUTHORIZED_ERROR"] = 10035] = "UNAUTHORIZED_ERROR";
    SaAPIErrorCode[SaAPIErrorCode["BUSINESS_PROCESSING_ERROR"] = 11000] = "BUSINESS_PROCESSING_ERROR";
    SaAPIErrorCode[SaAPIErrorCode["PARAMS_ERROR"] = 11001] = "PARAMS_ERROR";
    SaAPIErrorCode[SaAPIErrorCode["BIND_ACCOUNT_ERROR"] = 11002] = "BIND_ACCOUNT_ERROR";
})(SaAPIErrorCode || (exports.SaAPIErrorCode = SaAPIErrorCode = {}));
class SaAPIError extends Error {
    constructor(message, extensions, locations) {
        super(message);
        this.name = 'SaAPIError';
        this.extensions = extensions;
        this.locations = locations;
    }
}
exports.SaAPIError = SaAPIError;
//# sourceMappingURL=errors.js.map