import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  MatGridListHarness,
  MatGridTileHarness
} from '@angular/material/grid-list/testing';
import { By } from '@angular/platform-browser';
import { ISchedule } from '@xantar/domain/models';
import { Observable, of } from 'rxjs';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { ToolbarService } from '../../../shared/services/toolbar/toolbar.service';
import { SharedModule } from '../../../shared/shared.module';
import { mockSchedule } from '../../mocks/schedule.mock';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { DayComponent } from '../day/day.component';
import { TileComponent } from '../tile/tile.component';
import { ScheduleComponent } from './schedule.component';

const generateSchedule = jest.fn((): Observable<ISchedule> => of(mockSchedule));

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleComponent, DayComponent, TileComponent],
      imports: [getTranslocoModule(), MatGridListModule, SharedModule],
      providers: [
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        { provide: ToolbarService, useValue: { title: '' } },
        { provide: ScheduleService, useValue: { generateSchedule } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    generateSchedule.mockClear();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set toolbar title on init', () => {
    fixture.detectChanges();
    component.ngOnInit();
    const toolbarService = TestBed.inject(ToolbarService);
    expect(toolbarService.title).toBe('schedule.title');
  });

  it('should request the schedule on init', () => {
    expect(generateSchedule).not.toHaveBeenCalled();
    expect(component.schedule$).toBeUndefined();
    fixture.detectChanges();

    expect(generateSchedule).toHaveBeenCalled();
    expect(component.schedule$).toBeTruthy();
  });

  describe('Integration tests', () => {
    let rootLoader: HarnessLoader;

    beforeEach(() => {
      rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    });
    it('should show days and tiles', async () => {
      fixture.detectChanges();
      const daysGridList = await rootLoader.getAllHarnesses(MatGridListHarness);
      expect(daysGridList.length).toBe(7);

      const tilesGridList = await rootLoader.getAllHarnesses(
        MatGridTileHarness
      );
      expect(tilesGridList.length).toBe(35);
    });

    it('should show a day headers', () => {
      fixture.detectChanges();
      const dayHeaders = fixture.debugElement.queryAll(By.css('.day-header'));
      expect(dayHeaders.length).toBe(7);
      for (const dayHeader of dayHeaders) {
        expect(dayHeader.nativeElement.textContent).toBe('Saturday');
      }
    });

    it('should show reload content when no schedule', async () => {
      generateSchedule.mockReturnValueOnce(of(null as unknown as ISchedule));

      fixture.detectChanges();
      const reloadButton = await rootLoader.getHarness(MatButtonHarness);
      expect(reloadButton).toBeTruthy();

      const fetchScheduleSpy = jest.spyOn(component, 'fetchSchedule');
      expect(fetchScheduleSpy).not.toHaveBeenCalled();

      await reloadButton.click();
      expect(fetchScheduleSpy).toHaveBeenCalled();

      fetchScheduleSpy.mockRestore();
    });
  });
});
