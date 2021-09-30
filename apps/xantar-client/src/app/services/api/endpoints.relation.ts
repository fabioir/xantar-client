import {
  Endpoint,
  HttpMethodEnum,
  IXantarEnvironment
} from '@xantar/domain/models';

export class MealsEndpoint extends Endpoint {
  constructor(environment: IXantarEnvironment) {
    const mealsUrl = `${environment.baseHref}/meals`;
    const mealsMethods = [
      HttpMethodEnum.GET,
      HttpMethodEnum.POST,
      HttpMethodEnum.DELETE,
      HttpMethodEnum.PATCH
    ];
    super(mealsUrl, mealsMethods);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getUrlForMethod(method: HttpMethodEnum, props: any = null) {
    switch (method) {
      case HttpMethodEnum.GET:
      case HttpMethodEnum.POST:
        return this.getUrl();
      case HttpMethodEnum.DELETE:
      case HttpMethodEnum.PATCH:
        return `${this.getUrl()}/${props.id}`;
      default:
        return null as unknown as string;
    }
  }
}
