import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ISchedule } from '@xantar/domain/models';
import { Observable, of } from 'rxjs';
import { ToolbarService } from '../../../shared/services/toolbar/toolbar.service';
import { ScheduleService } from '../../services/schedule/schedule.service';

@Component({
  selector: 'xantar-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit {
  constructor(
    private scheduleService: ScheduleService,
    private toolbarService: ToolbarService,
    private translocoService: TranslocoService
  ) {}

  public schedule$!: Observable<ISchedule>;

  ngOnInit(): void {
    this.fetchSchedule();
    this.toolbarService.title =
      this.translocoService.translate('schedule.title');
  }

  public fetchSchedule() {
    this.schedule$ = of(this.scheduleService.generateSchedule());
  }
}
