import axios, { AxiosResponse } from 'axios';
import { Authentication } from './authentication';
import { SaAPIError } from './errors';

export enum PageInfoResParams {
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

export enum QueryType {
  QUERY = "",
  MUTATION = "mutation"
}

export abstract class QueryBase {
  protected queryType: QueryType = QueryType.QUERY;
  protected url: string;
  protected auth: Authentication;

  abstract get queryName(): string;
  abstract get queryParams(): Record<string, any>;
  abstract get resParams(): Record<string, any>;

  constructor(url: string, auth: Authentication) {
    this.url = url;
    this.auth = auth;
  }

  protected async _makeRequest(
    params: Record<string, any>,
    resParams: Record<string, any>
  ): Promise<any> {
    // Merge params with default query params
    const mergedParams = { ...this.queryParams, ...params };
    
    // Clean null/undefined values
    Object.keys(mergedParams).forEach(key => {
      if (mergedParams[key] === null || mergedParams[key] === undefined) {
        delete mergedParams[key];
      }
    });

    // Build GraphQL query
    const query = this.buildGraphQLQuery(mergedParams, resParams);
    const payload = JSON.stringify({ query });

    // Get authentication headers
    const headers = this.auth.getHeaders(payload);

    try {
      const response: AxiosResponse = await axios.post(this.url, { query }, { headers });
      
      if (response.data.errors && response.data.errors.length > 0) {
        const error = response.data.errors[0];
        throw new SaAPIError(
          error.message,
          error.extensions,
          error.locations
        );
      }

      return response.data.data[this.queryName];
    } catch (error) {
      if (error instanceof SaAPIError) {
        throw error;
      }
      throw new Error(`Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private buildGraphQLQuery(params: Record<string, any>, resParams: Record<string, any>): string {
    const paramsStr = this.buildParamsString(params);
    const fieldsStr = this.buildFieldsString(resParams);
    
    return `${this.queryType} {
      ${this.queryName}${paramsStr} {
        ${fieldsStr}
      }
    }`;
  }

  private buildParamsString(params: Record<string, any>): string {
    if (Object.keys(params).length === 0) return '';
    
    const paramsArray = Object.entries(params).map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}: "${value}"`;
      } else if (typeof value === 'object' && value !== null) {
        return `${key}: ${JSON.stringify(value).replace(/"/g, '')}`;
      }
      return `${key}: ${value}`;
    });
    
    return `(${paramsArray.join(', ')})`;
  }

  private buildFieldsString(resParams: Record<string, any>): string {
    const fields: string[] = [];
    
    if (resParams.nodes && Array.isArray(resParams.nodes)) {
      const nodesFields = resParams.nodes.join('\n        ');
      fields.push(`nodes {
        ${nodesFields}
      }`);
    }
    
    if (resParams.pageInfo && Array.isArray(resParams.pageInfo)) {
      const pageInfoFields = resParams.pageInfo.join('\n        ');
      fields.push(`pageInfo {
        ${pageInfoFields}
      }`);
    }
    
    return fields.join('\n      ');
  }
}
