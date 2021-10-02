import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { ToolbarService } from '../../../shared/services/toolbar/toolbar.service';
import { DayComponent } from '../day/day.component';
import { TileComponent } from '../tile/tile.component';
import { ScheduleComponent } from './schedule.component';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleComponent, DayComponent, TileComponent],
      imports: [getTranslocoModule(), MatGridListModule],
      providers: [
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        { provide: ToolbarService, useValue: { title: '' } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set toolbar title on init', () => {
    component.ngOnInit();
    const toolbarService = TestBed.inject(ToolbarService);
    expect(toolbarService.title).toBe('schedule.title');
  });
});
