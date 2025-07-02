"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOfferV2 = exports.ProductOfferV2Node = exports.ProductOfferV2SortType = exports.ProductOfferV2ListType = void 0;
const queryBase_1 = require("../queryBase");
var ProductOfferV2ListType;
(function (ProductOfferV2ListType) {
    ProductOfferV2ListType[ProductOfferV2ListType["HIGHEST_COMMISSION"] = 1] = "HIGHEST_COMMISSION";
    ProductOfferV2ListType[ProductOfferV2ListType["TOP_PERFORMING"] = 2] = "TOP_PERFORMING";
    ProductOfferV2ListType[ProductOfferV2ListType["LANDING_CATEGORY"] = 3] = "LANDING_CATEGORY";
    ProductOfferV2ListType[ProductOfferV2ListType["DETAIL_CATEGORY"] = 4] = "DETAIL_CATEGORY";
    ProductOfferV2ListType[ProductOfferV2ListType["DETAIL_SHOP"] = 5] = "DETAIL_SHOP";
})(ProductOfferV2ListType || (exports.ProductOfferV2ListType = ProductOfferV2ListType = {}));
var ProductOfferV2SortType;
(function (ProductOfferV2SortType) {
    ProductOfferV2SortType[ProductOfferV2SortType["RELEVANCE_DESC"] = 1] = "RELEVANCE_DESC";
    ProductOfferV2SortType[ProductOfferV2SortType["ITEM_SOLD_DESC"] = 2] = "ITEM_SOLD_DESC";
    ProductOfferV2SortType[ProductOfferV2SortType["PRICE_DESC"] = 3] = "PRICE_DESC";
    ProductOfferV2SortType[ProductOfferV2SortType["PRICE_ASC"] = 4] = "PRICE_ASC";
    ProductOfferV2SortType[ProductOfferV2SortType["COMMISSION_DESC"] = 5] = "COMMISSION_DESC";
})(ProductOfferV2SortType || (exports.ProductOfferV2SortType = ProductOfferV2SortType = {}));
var ProductOfferV2Node;
(function (ProductOfferV2Node) {
    ProductOfferV2Node["itemId"] = "itemId";
    ProductOfferV2Node["commissionRate"] = "commissionRate";
    ProductOfferV2Node["sellerCommissionRate"] = "sellerCommissionRate";
    ProductOfferV2Node["shopeeCommissionRate"] = "shopeeCommissionRate";
    ProductOfferV2Node["commission"] = "commission";
    ProductOfferV2Node["sales"] = "sales";
    ProductOfferV2Node["priceMax"] = "priceMax";
    ProductOfferV2Node["priceMin"] = "priceMin";
    ProductOfferV2Node["productCatIds"] = "productCatIds";
    ProductOfferV2Node["ratingStar"] = "ratingStar";
    ProductOfferV2Node["priceDiscountRate"] = "priceDiscountRate";
    ProductOfferV2Node["imageUrl"] = "imageUrl";
    ProductOfferV2Node["productName"] = "productName";
    ProductOfferV2Node["shopId"] = "shopId";
    ProductOfferV2Node["shopName"] = "shopName";
    ProductOfferV2Node["shopType"] = "shopType";
    ProductOfferV2Node["productLink"] = "productLink";
    ProductOfferV2Node["offerLink"] = "offerLink";
    ProductOfferV2Node["periodStartTime"] = "periodStartTime";
    ProductOfferV2Node["periodEndTime"] = "periodEndTime";
})(ProductOfferV2Node || (exports.ProductOfferV2Node = ProductOfferV2Node = {}));
class ProductOfferV2 extends queryBase_1.QueryBase {
    get queryName() {
        return "productOfferV2";
    }
    get queryParams() {
        return {
            shopId: null,
            itemId: null,
            productCatId: null,
            listType: null,
            matchId: null,
            isAMSOffer: null,
            isKeySeller: null,
            keyword: "",
            sortType: 1,
            page: 1,
            limit: 20
        };
    }
    get resParams() {
        return {
            nodes: Object.values(ProductOfferV2Node),
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
exports.ProductOfferV2 = ProductOfferV2;
//# sourceMappingURL=productOfferV2.js.map