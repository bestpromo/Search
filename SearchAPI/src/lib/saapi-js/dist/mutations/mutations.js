"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutations = void 0;
const generateShortLink_1 = require("./generateShortLink");
class Mutations {
    constructor(url, auth) {
        this.url = url;
        this.auth = auth;
    }
    get generateShortLink() {
        if (!this._generateShortLink) {
            this._generateShortLink = new generateShortLink_1.GenerateShortLink(this.url, this.auth);
        }
        return this._generateShortLink.makeRequest.bind(this._generateShortLink);
    }
}
exports.Mutations = Mutations;
//# sourceMappingURL=mutations.js.map