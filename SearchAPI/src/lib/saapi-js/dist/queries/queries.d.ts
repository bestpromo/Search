import { Authentication } from '../authentication';
import { ProductOfferV2QueryParams, ProductOfferV2ResParams } from './productOfferV2';
import { ShopOfferV2QueryParams, ShopOfferV2ResParams } from './shopOfferV2';
import { ShopeeOfferV2QueryParams, ShopeeOfferV2ResParams } from './shopeeOfferV2';
import { ConversionReportQueryParams, ConversionReportResParams } from './conversionReport';
import { ValidatedReportQueryParams, ValidatedReportResParams } from './validatedReport';
export interface ProductOfferV2Interface {
    (params: ProductOfferV2QueryParams, resParams: ProductOfferV2ResParams): Promise<any>;
}
export interface ShopOfferV2Interface {
    (params: ShopOfferV2QueryParams, resParams: ShopOfferV2ResParams): Promise<any>;
}
export interface ShopeeOfferV2Interface {
    (params: ShopeeOfferV2QueryParams, resParams: ShopeeOfferV2ResParams): Promise<any>;
}
export interface ConversionReportInterface {
    (params: ConversionReportQueryParams, resParams: ConversionReportResParams): Promise<any>;
}
export interface ValidatedReportInterface {
    (params: ValidatedReportQueryParams, resParams: ValidatedReportResParams): Promise<any>;
}
export declare class Queries {
    private url;
    private auth;
    private _productOfferV2?;
    private _shopOfferV2?;
    private _shopeeOfferV2?;
    private _conversionReport?;
    private _validatedReport?;
    constructor(url: string, auth: Authentication);
    get productOfferV2(): ProductOfferV2Interface;
    get shopOfferV2(): ShopOfferV2Interface;
    get shopeeOfferV2(): ShopeeOfferV2Interface;
    get conversionReport(): ConversionReportInterface;
    get validatedReport(): ValidatedReportInterface;
}
//# sourceMappingURL=queries.d.ts.map