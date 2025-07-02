"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queries = void 0;
const productOfferV2_1 = require("./productOfferV2");
const shopOfferV2_1 = require("./shopOfferV2");
const shopeeOfferV2_1 = require("./shopeeOfferV2");
const conversionReport_1 = require("./conversionReport");
const validatedReport_1 = require("./validatedReport");
class Queries {
    constructor(url, auth) {
        this.url = url;
        this.auth = auth;
    }
    get productOfferV2() {
        if (!this._productOfferV2) {
            this._productOfferV2 = new productOfferV2_1.ProductOfferV2(this.url, this.auth);
        }
        return this._productOfferV2.makeRequest.bind(this._productOfferV2);
    }
    get shopOfferV2() {
        if (!this._shopOfferV2) {
            this._shopOfferV2 = new shopOfferV2_1.ShopOfferV2(this.url, this.auth);
        }
        return this._shopOfferV2.makeRequest.bind(this._shopOfferV2);
    }
    get shopeeOfferV2() {
        if (!this._shopeeOfferV2) {
            this._shopeeOfferV2 = new shopeeOfferV2_1.ShopeeOfferV2(this.url, this.auth);
        }
        return this._shopeeOfferV2.makeRequest.bind(this._shopeeOfferV2);
    }
    get conversionReport() {
        if (!this._conversionReport) {
            this._conversionReport = new conversionReport_1.ConversionReport(this.url, this.auth);
        }
        return this._conversionReport.makeRequest.bind(this._conversionReport);
    }
    get validatedReport() {
        if (!this._validatedReport) {
            this._validatedReport = new validatedReport_1.ValidatedReport(this.url, this.auth);
        }
        return this._validatedReport.makeRequest.bind(this._validatedReport);
    }
}
exports.Queries = Queries;
//# sourceMappingURL=queries.js.map