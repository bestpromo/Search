export enum SaAPIErrorCode {
  SYSTEM_ERROR = 10_000,
  REQUEST_PARSING_ERROR = 10_010,
  IDENTITY_AUTHENTICATION_ERROR = 10_020,
  TRIGGER_TRAFFIC_LIMITING = 10_030,
  ACCESS_DENY = 10_031,
  INVALID_AFFILIATE_ID = 10_032,
  ACCOUNT_IS_FROZEN = 10_033,
  AFFILIATE_ID_BLACK_LIST = 10_034,
  UNAUTHORIZED_ERROR = 10_035,
  BUSINESS_PROCESSING_ERROR = 11_000,
  PARAMS_ERROR = 11_001,
  BIND_ACCOUNT_ERROR = 11_002
}

export interface Extensions {
  code: number;
  message: string;
}

export interface ErrorLocation {
  line: number;
  column: number;
}

export class SaAPIError extends Error {
  public extensions: Extensions;
  public locations?: ErrorLocation[];

  constructor(
    message: string,
    extensions: Extensions,
    locations?: ErrorLocation[]
  ) {
    super(message);
    this.name = 'SaAPIError';
    this.extensions = extensions;
    this.locations = locations;
  }
}
