"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopOfferV2 = exports.ShopOfferV2Node = exports.ShopOfferV2SortType = exports.ShopOfferV2ShopType = void 0;
const queryBase_1 = require("../queryBase");
var ShopOfferV2ShopType;
(function (ShopOfferV2ShopType) {
    ShopOfferV2ShopType[ShopOfferV2ShopType["OFFICIAL_SHOP"] = 1] = "OFFICIAL_SHOP";
    ShopOfferV2ShopType[ShopOfferV2ShopType["PREFERRED_SHOP"] = 2] = "PREFERRED_SHOP";
    ShopOfferV2ShopType[ShopOfferV2ShopType["PREFERRED_PLUS_SHOP"] = 4] = "PREFERRED_PLUS_SHOP";
})(ShopOfferV2ShopType || (exports.ShopOfferV2ShopType = ShopOfferV2ShopType = {}));
var ShopOfferV2SortType;
(function (ShopOfferV2SortType) {
    ShopOfferV2SortType[ShopOfferV2SortType["SHOP_LIST_SORT_TYPE_LATEST_DESC"] = 1] = "SHOP_LIST_SORT_TYPE_LATEST_DESC";
    ShopOfferV2SortType[ShopOfferV2SortType["SHOP_LIST_SORT_TYPE_HIGHEST_COMMISSION_DESC"] = 2] = "SHOP_LIST_SORT_TYPE_HIGHEST_COMMISSION_DESC";
    ShopOfferV2SortType[ShopOfferV2SortType["SHOP_LIST_SORT_TYPE_POPULAR_SHOP_DESC"] = 3] = "SHOP_LIST_SORT_TYPE_POPULAR_SHOP_DESC";
})(ShopOfferV2SortType || (exports.ShopOfferV2SortType = ShopOfferV2SortType = {}));
var ShopOfferV2Node;
(function (ShopOfferV2Node) {
    ShopOfferV2Node["commissionRate"] = "commissionRate";
    ShopOfferV2Node["imageUrl"] = "imageUrl";
    ShopOfferV2Node["offerLink"] = "offerLink";
    ShopOfferV2Node["originalLink"] = "originalLink";
    ShopOfferV2Node["shopId"] = "shopId";
    ShopOfferV2Node["shopName"] = "shopName";
    ShopOfferV2Node["ratingStar"] = "ratingStar";
    ShopOfferV2Node["shopType"] = "shopType";
    ShopOfferV2Node["remainingBudget"] = "remainingBudget";
    ShopOfferV2Node["periodStartTime"] = "periodStartTime";
    ShopOfferV2Node["periodEndTime"] = "periodEndTime";
    ShopOfferV2Node["sellerCommCoveRatio"] = "sellerCommCoveRatio";
    ShopOfferV2Node["bannerInfo"] = "bannerInfo";
})(ShopOfferV2Node || (exports.ShopOfferV2Node = ShopOfferV2Node = {}));
class ShopOfferV2 extends queryBase_1.QueryBase {
    get queryName() {
        return "shopOfferV2";
    }
    get queryParams() {
        return {
            shopId: null,
            shopType: null,
            isKeySeller: null,
            sellerCommCoveRatio: null,
            keyword: "",
            sortType: 1,
            page: 1,
            limit: 20
        };
    }
    get resParams() {
        return {
            nodes: Object.values(ShopOfferV2Node),
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
exports.ShopOfferV2 = ShopOfferV2;
//# sourceMappingURL=shopOfferV2.js.map