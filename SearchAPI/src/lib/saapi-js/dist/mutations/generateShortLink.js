"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateShortLink = exports.GenerateShortLinkResParams = void 0;
const queryBase_1 = require("../queryBase");
var GenerateShortLinkResParams;
(function (GenerateShortLinkResParams) {
    GenerateShortLinkResParams["shortLink"] = "shortLink";
})(GenerateShortLinkResParams || (exports.GenerateShortLinkResParams = GenerateShortLinkResParams = {}));
class GenerateShortLink extends queryBase_1.QueryBase {
    get queryName() {
        return "generateShortLink";
    }
    get queryParams() {
        return {
            input: {
                originUrl: null,
                subIds: null
            }
        };
    }
    get resParams() {
        return Object.values(GenerateShortLinkResParams);
    }
    constructor(url, auth) {
        super(url, auth);
        this.queryType = queryBase_1.QueryType.MUTATION;
    }
    async makeRequest(params, resParams) {
        return super._makeRequest(params, { nodes: resParams });
    }
}
exports.GenerateShortLink = GenerateShortLink;
//# sourceMappingURL=generateShortLink.js.map