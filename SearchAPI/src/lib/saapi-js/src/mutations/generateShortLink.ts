import { QueryBase, QueryType } from '../queryBase';
import { Authentication } from '../authentication';

export interface GenerateShortLinkInput {
  originUrl: string;
  subIds?: string[];
}

export interface GenerateShortLinkQueryParams {
  input: GenerateShortLinkInput;
}

export enum GenerateShortLinkResParams {
  shortLink = "shortLink"
}

export class GenerateShortLink extends QueryBase {
  protected queryType: QueryType = QueryType.MUTATION;

  get queryName(): string {
    return "generateShortLink";
  }

  get queryParams(): Record<string, any> {
    return {
      input: {
        originUrl: null,
        subIds: null
      }
    };
  }

  get resParams(): Record<string, any> {
    return Object.values(GenerateShortLinkResParams);
  }

  constructor(url: string, auth: Authentication) {
    super(url, auth);
  }

  async makeRequest(
    params: GenerateShortLinkQueryParams,
    resParams: string[]
  ): Promise<any> {
    return super._makeRequest(params, { nodes: resParams });
  }
}
