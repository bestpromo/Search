"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopeeOfferV2 = exports.ShopeeOfferV2Node = exports.ShopeeOfferV2SortType = void 0;
const queryBase_1 = require("../queryBase");
var ShopeeOfferV2SortType;
(function (ShopeeOfferV2SortType) {
    ShopeeOfferV2SortType[ShopeeOfferV2SortType["LATEST_DESC"] = 1] = "LATEST_DESC";
    ShopeeOfferV2SortType[ShopeeOfferV2SortType["HIGHEST_COMMISSION_DESC"] = 2] = "HIGHEST_COMMISSION_DESC";
})(ShopeeOfferV2SortType || (exports.ShopeeOfferV2SortType = ShopeeOfferV2SortType = {}));
var ShopeeOfferV2Node;
(function (ShopeeOfferV2Node) {
    ShopeeOfferV2Node["commissionRate"] = "commissionRate";
    ShopeeOfferV2Node["imageUrl"] = "imageUrl";
    ShopeeOfferV2Node["offerLink"] = "offerLink";
    ShopeeOfferV2Node["originalLink"] = "originalLink";
    ShopeeOfferV2Node["offerName"] = "offerName";
    ShopeeOfferV2Node["offerType"] = "offerType";
    ShopeeOfferV2Node["categoryId"] = "categoryId";
    ShopeeOfferV2Node["collectionId"] = "collectionId";
    ShopeeOfferV2Node["periodStartTime"] = "periodStartTime";
    ShopeeOfferV2Node["periodEndTime"] = "periodEndTime";
})(ShopeeOfferV2Node || (exports.ShopeeOfferV2Node = ShopeeOfferV2Node = {}));
class ShopeeOfferV2 extends queryBase_1.QueryBase {
    get queryName() {
        return "shopeeOfferV2";
    }
    get queryParams() {
        return {
            keyword: "",
            sortType: 1,
            page: 1,
            limit: 20
        };
    }
    get resParams() {
        return {
            nodes: Object.values(ShopeeOfferV2Node),
            pageInfo: Object.values(queryBase_1.PageInfoResParams)
        };
    }
    constructor(url, auth) {
        super(url, auth);
    }
    async makeRequest(params, resParams) {
        return super._makeRequest(params, resParams);
    }
}
exports.ShopeeOfferV2 = ShopeeOfferV2;
//# sourceMappingURL=shopeeOfferV2.js.map