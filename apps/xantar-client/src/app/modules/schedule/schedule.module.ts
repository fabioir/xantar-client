import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '../shared/shared.module';
import { DayComponent } from './components/day/day.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { TileComponent } from './components/tile/tile.component';

const materialModules = [MatGridListModule];

@NgModule({
  declarations: [ScheduleComponent, DayComponent, TileComponent],
  imports: [
    SharedModule,
    CommonModule,
    ScheduleRoutingModule,
    TranslocoModule,
    ...materialModules
  ]
})
export class ScheduleModule {}
