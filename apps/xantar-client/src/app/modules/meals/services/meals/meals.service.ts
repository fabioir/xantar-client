import { Injectable } from '@angular/core';
import { HttpMethodEnum, IMealSumup } from '@xantar/domain/models';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../services/api/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MealsService {
  constructor(private api: ApiService, private http: HttpClient) {}

  public getMealsList(): Observable<IMealSumup[]> {
    const endpoint = this.api.getEndpoint('meals');
    const url = endpoint.getUrlForMethod(HttpMethodEnum.GET);

    return this.http.get<IMealSumup[]>(url);
  }
}
