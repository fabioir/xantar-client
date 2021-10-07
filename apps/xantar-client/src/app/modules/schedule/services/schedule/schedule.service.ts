import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpMethodEnum, ISchedule } from '@xantar/domain/models';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../services/api/api.service';
import { defaultConfig } from './defaultConfig.mock';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private api: ApiService, private http: HttpClient) {}

  public generateSchedule(): Observable<ISchedule> {
    const endpoint = this.api.getEndpoint('schedules');
    const url = endpoint.getUrlForMethod(HttpMethodEnum.POST);

    return this.http.post<ISchedule>(url, defaultConfig);
  }
}
