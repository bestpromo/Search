import { Authentication } from './authentication';
import { Country } from './countries';
import { Queries } from './queries/queries';
import { Mutations } from './mutations/mutations';

export interface SaAPIConfig {
  appId: string;
  secret: string;
  country?: Country | string;
}

export class SaAPI {
  private auth: Authentication;
  private url: string;
  private _queries?: Queries;
  private _mutations?: Mutations;

  constructor(config: SaAPIConfig) {
    this.auth = new Authentication(config.appId, config.secret);

    let country: string;
    if (config.country) {
      if (typeof config.country === 'string' && !Object.values(Country).includes(config.country as Country)) {
        throw new Error(`Allowed country values: ${Object.values(Country).join(', ')}`);
      }
      country = config.country as string;
    } else {
      country = Country.BRAZIL;
    }

    this.url = `https://open-api.affiliate.shopee.${country}/graphql`;
  }

  get queries(): Queries {
    if (!this._queries) {
      this._queries = new Queries(this.url, this.auth);
    }
    return this._queries;
  }

  get mutations(): Mutations {
    if (!this._mutations) {
      this._mutations = new Mutations(this.url, this.auth);
    }
    return this._mutations;
  }
}
