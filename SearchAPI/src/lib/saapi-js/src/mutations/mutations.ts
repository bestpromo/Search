import { Authentication } from '../authentication';
import { GenerateShortLink, GenerateShortLinkQueryParams } from './generateShortLink';

export interface GenerateShortLinkInterface {
  (params: GenerateShortLinkQueryParams, resParams: string[]): Promise<any>;
}

export class Mutations {
  private url: string;
  private auth: Authentication;
  private _generateShortLink?: GenerateShortLink;

  constructor(url: string, auth: Authentication) {
    this.url = url;
    this.auth = auth;
  }

  get generateShortLink(): GenerateShortLinkInterface {
    if (!this._generateShortLink) {
      this._generateShortLink = new GenerateShortLink(this.url, this.auth);
    }
    return this._generateShortLink.makeRequest.bind(this._generateShortLink);
  }
}
