"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const crypto_1 = require("crypto");
class Authentication {
    constructor(appId, secret) {
        this.appId = appId;
        this.secret = secret;
    }
    getHeaders(payload) {
        const timestamp = Math.floor(Date.now() / 1000);
        const signFactor = `${this.appId}${timestamp}${payload}${this.secret}`;
        const signature = (0, crypto_1.createHash)('sha256').update(signFactor).digest('hex');
        const auth = `SHA256 Credential=${this.appId}, Timestamp=${timestamp}, Signature=${signature}`;
        return {
            'Content-Type': 'application/json',
            'Authorization': auth
        };
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=authentication.js.map