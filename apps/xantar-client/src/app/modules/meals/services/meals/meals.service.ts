import { Injectable } from '@angular/core';
import { IMealSumup } from '@xantar/domain/models';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../services/api/api.service';

@Injectable()
export class MealsService {
  constructor(private api: ApiService) {}

  getMealsList(): Observable<IMealSumup[]> {
    return this.api.getMealsList();
  }
}
