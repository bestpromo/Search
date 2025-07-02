import { ReportQueryBase, ReportQueryParamsBase, ReportNode, ReportPageInfoResParams } from './reportQueryBase';
import { Authentication } from '../authentication';
export interface ValidatedReportQueryParams extends ReportQueryParamsBase {
    validationId: number;
}
export interface ValidatedReportResParams {
    nodes: (ReportNode | string)[];
    pageInfo?: (ReportPageInfoResParams | string)[];
}
export declare class ValidatedReport extends ReportQueryBase {
    get queryName(): string;
    get queryParams(): Record<string, any>;
    get resParams(): Record<string, any>;
    constructor(url: string, auth: Authentication);
    makeRequest(params: ValidatedReportQueryParams, resParams: ValidatedReportResParams): Promise<any>;
}
//# sourceMappingURL=validatedReport.d.ts.map