import { Authentication } from '../authentication';
import { ProductOfferV2, ProductOfferV2QueryParams, ProductOfferV2ResParams } from './productOfferV2';
import { ShopOfferV2, ShopOfferV2QueryParams, ShopOfferV2ResParams } from './shopOfferV2';
import { ShopeeOfferV2, ShopeeOfferV2QueryParams, ShopeeOfferV2ResParams } from './shopeeOfferV2';
import { ConversionReport, ConversionReportQueryParams, ConversionReportResParams } from './conversionReport';
import { ValidatedReport, ValidatedReportQueryParams, ValidatedReportResParams } from './validatedReport';

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

export class Queries {
  private url: string;
  private auth: Authentication;
  private _productOfferV2?: ProductOfferV2;
  private _shopOfferV2?: ShopOfferV2;
  private _shopeeOfferV2?: ShopeeOfferV2;
  private _conversionReport?: ConversionReport;
  private _validatedReport?: ValidatedReport;

  constructor(url: string, auth: Authentication) {
    this.url = url;
    this.auth = auth;
  }

  get productOfferV2(): ProductOfferV2Interface {
    if (!this._productOfferV2) {
      this._productOfferV2 = new ProductOfferV2(this.url, this.auth);
    }
    return this._productOfferV2.makeRequest.bind(this._productOfferV2);
  }

  get shopOfferV2(): ShopOfferV2Interface {
    if (!this._shopOfferV2) {
      this._shopOfferV2 = new ShopOfferV2(this.url, this.auth);
    }
    return this._shopOfferV2.makeRequest.bind(this._shopOfferV2);
  }

  get shopeeOfferV2(): ShopeeOfferV2Interface {
    if (!this._shopeeOfferV2) {
      this._shopeeOfferV2 = new ShopeeOfferV2(this.url, this.auth);
    }
    return this._shopeeOfferV2.makeRequest.bind(this._shopeeOfferV2);
  }

  get conversionReport(): ConversionReportInterface {
    if (!this._conversionReport) {
      this._conversionReport = new ConversionReport(this.url, this.auth);
    }
    return this._conversionReport.makeRequest.bind(this._conversionReport);
  }

  get validatedReport(): ValidatedReportInterface {
    if (!this._validatedReport) {
      this._validatedReport = new ValidatedReport(this.url, this.auth);
    }
    return this._validatedReport.makeRequest.bind(this._validatedReport);
  }
}
