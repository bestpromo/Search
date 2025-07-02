"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaAPI = void 0;
const authentication_1 = require("./authentication");
const countries_1 = require("./countries");
const queries_1 = require("./queries/queries");
const mutations_1 = require("./mutations/mutations");
class SaAPI {
    constructor(config) {
        this.auth = new authentication_1.Authentication(config.appId, config.secret);
        let country;
        if (config.country) {
            if (typeof config.country === 'string' && !Object.values(countries_1.Country).includes(config.country)) {
                throw new Error(`Allowed country values: ${Object.values(countries_1.Country).join(', ')}`);
            }
            country = config.country;
        }
        else {
            country = countries_1.Country.BRAZIL;
        }
        this.url = `https://open-api.affiliate.shopee.${country}/graphql`;
    }
    get queries() {
        if (!this._queries) {
            this._queries = new queries_1.Queries(this.url, this.auth);
        }
        return this._queries;
    }
    get mutations() {
        if (!this._mutations) {
            this._mutations = new mutations_1.Mutations(this.url, this.auth);
        }
        return this._mutations;
    }
}
exports.SaAPI = SaAPI;
//# sourceMappingURL=saapi.js.map