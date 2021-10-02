import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IIconButtonSettings } from '@xantar/domain/models';
import { Subject } from 'rxjs';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { ToolbarComponent } from './toolbar.component';

const materialModules = [MatToolbarModule, MatIconModule, MatTooltipModule];

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let rootLoader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        ...materialModules,
        getTranslocoModule(),
        RouterTestingModule.withRoutes([
          { path: 'meals', component: ToolbarComponent },
          { path: 'schedule', component: ToolbarComponent }
        ])
      ],
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show title', () => {
    const toolbarService = TestBed.inject(ToolbarService);
    toolbarService.title = 'Test title';

    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.toolbar-title'));

    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toBe('Test title');
  });

  it('should configure add button', async () => {
    let clicked = false;
    const clickSubject = new Subject<boolean>();
    const addSettings: IIconButtonSettings = {
      tooltip: 'test',
      clickSubject
    };

    const toolbarService = TestBed.inject(ToolbarService);
    toolbarService.addButtonSettings = addSettings;

    fixture.detectChanges();

    clickSubject.subscribe((value) => {
      expect(value).toBe(true);
      clicked = true;
    });

    const addMealButtonHarness = await rootLoader.getHarness(
      MatButtonHarness.with({ selector: '.create-meal-button' })
    );
    expect(addMealButtonHarness).toBeTruthy();
    await addMealButtonHarness.click();
    expect(clicked).toBe(true);
  });

  describe('navigation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should navigate to schedule, show go to meals list anchor and hide schedule button', async () => {
      const toScheduleButtonHarness = await rootLoader.getHarness(
        MatButtonHarness.with({ selector: '.schedule-anchor' })
      );
      expect(toScheduleButtonHarness).toBeTruthy();
      await toScheduleButtonHarness.click();

      const anchorButtons = await rootLoader.getAllHarnesses(
        MatButtonHarness.with({ selector: 'a' })
      );
      expect(anchorButtons.length).toBe(1);
      const anchorButtonText = await anchorButtons[0].getText();
      expect(anchorButtonText).toBe('format_list_bulleted');
    });

    it('should navigate to meals list, show go to schedule anchor and hide meals list button', async () => {
      const toScheduleButtonHarness = await rootLoader.getHarness(
        MatButtonHarness.with({ selector: '.meals-list-anchor' })
      );
      expect(toScheduleButtonHarness).toBeTruthy();
      await toScheduleButtonHarness.click();

      const anchorButtons = await rootLoader.getAllHarnesses(
        MatButtonHarness.with({ selector: 'a' })
      );
      expect(anchorButtons.length).toBe(1);
      const anchorButtonText = await anchorButtons[0].getText();
      expect(anchorButtonText).toBe('restaurant');
    });
  });
});
