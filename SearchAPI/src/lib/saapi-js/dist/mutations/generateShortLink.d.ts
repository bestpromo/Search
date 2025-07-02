import { QueryBase, QueryType } from '../queryBase';
import { Authentication } from '../authentication';
export interface GenerateShortLinkInput {
    originUrl: string;
    subIds?: string[];
}
export interface GenerateShortLinkQueryParams {
    input: GenerateShortLinkInput;
}
export declare enum GenerateShortLinkResParams {
    shortLink = "shortLink"
}
export declare class GenerateShortLink extends QueryBase {
    protected queryType: QueryType;
    get queryName(): string;
    get queryParams(): Record<string, any>;
    get resParams(): Record<string, any>;
    constructor(url: string, auth: Authentication);
    makeRequest(params: GenerateShortLinkQueryParams, resParams: string[]): Promise<any>;
}
//# sourceMappingURL=generateShortLink.d.ts.map