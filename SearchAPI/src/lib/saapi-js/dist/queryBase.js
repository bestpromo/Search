"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBase = exports.QueryType = exports.PageInfoResParams = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("./errors");
var PageInfoResParams;
(function (PageInfoResParams) {
    PageInfoResParams["page"] = "page";
    PageInfoResParams["limit"] = "limit";
    PageInfoResParams["hasNextPage"] = "hasNextPage";
    PageInfoResParams["scrollId"] = "scrollId";
})(PageInfoResParams || (exports.PageInfoResParams = PageInfoResParams = {}));
var QueryType;
(function (QueryType) {
    QueryType["QUERY"] = "";
    QueryType["MUTATION"] = "mutation";
})(QueryType || (exports.QueryType = QueryType = {}));
class QueryBase {
    constructor(url, auth) {
        this.queryType = QueryType.QUERY;
        this.url = url;
        this.auth = auth;
    }
    async _makeRequest(params, resParams) {
        // Merge params with default query params
        const mergedParams = { ...this.queryParams, ...params };
        // Clean null/undefined values
        Object.keys(mergedParams).forEach(key => {
            if (mergedParams[key] === null || mergedParams[key] === undefined) {
                delete mergedParams[key];
            }
        });
        // Build GraphQL query
        const query = this.buildGraphQLQuery(mergedParams, resParams);
        const payload = JSON.stringify({ query });
        // Get authentication headers
        const headers = this.auth.getHeaders(payload);
        try {
            const response = await axios_1.default.post(this.url, { query }, { headers });
            if (response.data.errors && response.data.errors.length > 0) {
                const error = response.data.errors[0];
                throw new errors_1.SaAPIError(error.message, error.extensions, error.locations);
            }
            return response.data.data[this.queryName];
        }
        catch (error) {
            if (error instanceof errors_1.SaAPIError) {
                throw error;
            }
            throw new Error(`Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    buildGraphQLQuery(params, resParams) {
        const paramsStr = this.buildParamsString(params);
        const fieldsStr = this.buildFieldsString(resParams);
        return `${this.queryType} {
      ${this.queryName}${paramsStr} {
        ${fieldsStr}
      }
    }`;
    }
    buildParamsString(params) {
        if (Object.keys(params).length === 0)
            return '';
        const paramsArray = Object.entries(params).map(([key, value]) => {
            if (typeof value === 'string') {
                return `${key}: "${value}"`;
            }
            else if (typeof value === 'object' && value !== null) {
                return `${key}: ${JSON.stringify(value).replace(/"/g, '')}`;
            }
            return `${key}: ${value}`;
        });
        return `(${paramsArray.join(', ')})`;
    }
    buildFieldsString(resParams) {
        const fields = [];
        if (resParams.nodes && Array.isArray(resParams.nodes)) {
            const nodesFields = resParams.nodes.join('\n        ');
            fields.push(`nodes {
        ${nodesFields}
      }`);
        }
        if (resParams.pageInfo && Array.isArray(resParams.pageInfo)) {
            const pageInfoFields = resParams.pageInfo.join('\n        ');
            fields.push(`pageInfo {
        ${pageInfoFields}
      }`);
        }
        return fields.join('\n      ');
    }
}
exports.QueryBase = QueryBase;
//# sourceMappingURL=queryBase.js.map