import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { IIconButtonSettings } from '@xantar/domain/models';
import { Subject } from 'rxjs';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { ToolbarComponent } from './toolbar.component';

const materialModules = [MatToolbarModule, MatIconModule, MatTooltipModule];
describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [...materialModules, getTranslocoModule()],
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
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

  it('should configure add button', (done) => {
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
      done();
    });

    const addButton = fixture.debugElement.query(By.css('.create-meal-button'));
    expect(addButton).toBeTruthy();
    addButton.nativeElement.click();
  });
});
