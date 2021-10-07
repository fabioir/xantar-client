export enum HttpMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  PATCH = 'PATCH',
  CONNECT = 'CONNECT',
  TRACE = 'TRACE'
}

export interface EndpointRelation {
  [key: string]: Endpoint;
}

export abstract class Endpoint {
  constructor(
    private readonly url: string,
    private readonly methods: HttpMethodEnum[],
    private readonly queryParams?: string[]
  ) {}

  public getUrl(): string {
    return this.url;
  }

  public getMethods(): HttpMethodEnum[] {
    return this.methods;
  }

  public getQueryParams(): string[] {
    return this.queryParams || [];
  }

  public abstract getUrlForMethod(method: HttpMethodEnum): string;
}
