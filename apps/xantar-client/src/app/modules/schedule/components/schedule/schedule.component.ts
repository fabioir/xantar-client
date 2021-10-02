import { Component, OnInit } from '@angular/core';
import { ISchedule } from '@xantar/domain/models';
import { Observable, of } from 'rxjs';
import { ScheduleService } from '../../services/schedule/schedule.service';

@Component({
  selector: 'xantar-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  constructor(private scheduleService: ScheduleService) {}

  public schedule$!: Observable<ISchedule>;

  ngOnInit(): void {
    this.fetchSchedule();
  }

  public fetchSchedule() {
    this.schedule$ = of(this.scheduleService.generateSchedule());
  }
}
