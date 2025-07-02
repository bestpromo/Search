export declare enum SaAPIErrorCode {
    SYSTEM_ERROR = 10000,
    REQUEST_PARSING_ERROR = 10010,
    IDENTITY_AUTHENTICATION_ERROR = 10020,
    TRIGGER_TRAFFIC_LIMITING = 10030,
    ACCESS_DENY = 10031,
    INVALID_AFFILIATE_ID = 10032,
    ACCOUNT_IS_FROZEN = 10033,
    AFFILIATE_ID_BLACK_LIST = 10034,
    UNAUTHORIZED_ERROR = 10035,
    BUSINESS_PROCESSING_ERROR = 11000,
    PARAMS_ERROR = 11001,
    BIND_ACCOUNT_ERROR = 11002
}
export interface Extensions {
    code: number;
    message: string;
}
export interface ErrorLocation {
    line: number;
    column: number;
}
export declare class SaAPIError extends Error {
    extensions: Extensions;
    locations?: ErrorLocation[];
    constructor(message: string, extensions: Extensions, locations?: ErrorLocation[]);
}
//# sourceMappingURL=errors.d.ts.map