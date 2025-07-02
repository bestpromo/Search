import { Authentication } from '../authentication';
import { GenerateShortLinkQueryParams } from './generateShortLink';
export interface GenerateShortLinkInterface {
    (params: GenerateShortLinkQueryParams, resParams: string[]): Promise<any>;
}
export declare class Mutations {
    private url;
    private auth;
    private _generateShortLink?;
    constructor(url: string, auth: Authentication);
    get generateShortLink(): GenerateShortLinkInterface;
}
//# sourceMappingURL=mutations.d.ts.map