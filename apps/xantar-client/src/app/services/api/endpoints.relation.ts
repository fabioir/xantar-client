import {
  Endpoint,
  HttpMethodEnum,
  IXantarEnvironment
} from '@xantar/domain/models';

export class MealsEndpoint extends Endpoint {
  constructor(environment: IXantarEnvironment) {
    const mealsUrl = `${environment.baseHref}/meals`;
    const mealsMethods = [HttpMethodEnum.GET];
    super(mealsUrl, mealsMethods);
  }

  public getUrlForMethod(method: HttpMethodEnum) {
    switch (method) {
      case HttpMethodEnum.GET:
        return this.getUrl();
      default:
        return null as unknown as string;
    }
  }
}