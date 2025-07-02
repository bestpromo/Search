"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatedReport = void 0;
const reportQueryBase_1 = require("./reportQueryBase");
class ValidatedReport extends reportQueryBase_1.ReportQueryBase {
    get queryName() {
        return "validatedReport";
    }
    get queryParams() {
        return {
            validationId: null,
            limit: 20,
            scrollId: null
        };
    }
    get resParams() {
        return {
            nodes: Object.values(reportQueryBase_1.ReportNode),
            pageInfo: Object.values(reportQueryBase_1.ReportPageInfoResParams)
        };
    }
    constructor(url, auth) {
        super(url, auth);
    }
    async makeRequest(params, resParams) {
        return super._makeRequest(params, resParams);
    }
}
exports.ValidatedReport = ValidatedReport;
//# sourceMappingURL=validatedReport.js.map