import { Injectable } from '@angular/core';
import { ISchedule } from '@xantar/domain/models';
import { mockSchedule } from '../../mocks/schedule.mock';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  public generateSchedule(): ISchedule {
    return mockSchedule;
  }
}
