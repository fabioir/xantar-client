import { Injectable } from '@angular/core';
import { ISchedule } from '@xantar/domain/models';
import { Observable, of } from 'rxjs';
import { mockSchedule } from '../../mocks/schedule.mock';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  public generateSchedule(): Observable<ISchedule> {
    return of(mockSchedule);
  }
}
