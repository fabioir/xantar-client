import { Injectable } from '@angular/core';
import { HttpMethodEnum, IMealSumup } from '@xantar/domain/models';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../../services/api/api.service';
import { mockMeal } from '../../components/meals-list/meals-list.mock';

@Injectable()
export class MealsService {
  constructor(private api: ApiService) {}

  public getMealsList(): Observable<IMealSumup[]> {
    const endpoint = this.api.getEndpoint('meals');
    const method = HttpMethodEnum.GET;
    const url = endpoint.getUrlForMethod(method);

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
