import { Authentication } from './authentication';
export declare enum PageInfoResParams {
    page = "page",
    limit = "limit",
    hasNextPage = "hasNextPage",
    scrollId = "scrollId"
}
export interface QueryParamsBase {
    keyword?: string;
    sortType?: number;
    page?: number;
    limit?: number;
}
export interface ResParams {
    nodes?: string[];
    pageInfo?: string[];
}
export declare enum QueryType {
    QUERY = "",
    MUTATION = "mutation"
}
export declare abstract class QueryBase {
    protected queryType: QueryType;
    protected url: string;
    protected auth: Authentication;
    abstract get queryName(): string;
    abstract get queryParams(): Record<string, any>;
    abstract get resParams(): Record<string, any>;
    constructor(url: string, auth: Authentication);
    protected _makeRequest(params: Record<string, any>, resParams: Record<string, any>): Promise<any>;
    private buildGraphQLQuery;
    private buildParamsString;
    private buildFieldsString;
}
//# sourceMappingURL=queryBase.d.ts.map