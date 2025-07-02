import { Country } from './countries';
import { Queries } from './queries/queries';
import { Mutations } from './mutations/mutations';
export interface SaAPIConfig {
    appId: string;
    secret: string;
    country?: Country | string;
}
export declare class SaAPI {
    private auth;
    private url;
    private _queries?;
    private _mutations?;
    constructor(config: SaAPIConfig);
    get queries(): Queries;
    get mutations(): Mutations;
}
//# sourceMappingURL=saapi.d.ts.map