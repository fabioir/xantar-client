import { Injectable } from '@angular/core';
import {
  IMealSumup,
  IXantarEnvironment,
  EndpointRelation,
  HttpMethodEnum,
  Endpoint
} from '@xantar/domain/models';
import { Observable, of } from 'rxjs';
import { mockMeal } from '../../modules/meals/components/meals-list/meals-list.mock';
import { MealsEndpoint } from './endpoints.relation';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private environment: IXantarEnvironment = {
    // TODO remove
    baseHref: 'testingXantarEndpointRelation',
    production: false
  };

  private endpoints: EndpointRelation = {};

  public init() {
    this.endpoints.meals = new MealsEndpoint(
      this.environment
    ) as unknown as Endpoint;
  }

  public getMealsList(): Observable<IMealSumup[]> {
    const method = HttpMethodEnum.GET;
    const url = this.endpoints.meals.getUrlForMethod(method);

    // Make http request to url
    console.log(`${method + ''} to ${url}`);

    return of([
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal,
      mockMeal
    ]);
  }
}
