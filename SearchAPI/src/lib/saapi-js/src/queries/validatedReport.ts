import { ReportQueryBase, ReportQueryParamsBase, ReportNode, ReportPageInfoResParams } from './reportQueryBase';
import { Authentication } from '../authentication';

export interface ValidatedReportQueryParams extends ReportQueryParamsBase {
  validationId: number;
}

export interface ValidatedReportResParams {
  nodes: (ReportNode | string)[];
  pageInfo?: (ReportPageInfoResParams | string)[];
}

export class ValidatedReport extends ReportQueryBase {
  get queryName(): string {
    return "validatedReport";
  }

  get queryParams(): Record<string, any> {
    return {
      validationId: null,
      limit: 20,
      scrollId: null
    };
  }

  get resParams(): Record<string, any> {
    return {
      nodes: Object.values(ReportNode),
      pageInfo: Object.values(ReportPageInfoResParams)
    };
  }

  constructor(url: string, auth: Authentication) {
    super(url, auth);
  }

  async makeRequest(
    params: ValidatedReportQueryParams,
    resParams: ValidatedReportResParams
  ): Promise<any> {
    return super._makeRequest(params, resParams);
  }
}
