import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';

import { ReloadContentComponent } from './reload-content.component';

const materialModules = [MatButtonModule, MatIconModule, MatTooltipModule];

describe('ReloadContentComponent', () => {
  let component: ReloadContentComponent;
  let fixture: ComponentFixture<ReloadContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReloadContentComponent],
      imports: materialModules,
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadContentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show message', () => {
    component.message = 'Test message';
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('span.message'));
    expect(message).toBeTruthy();
    expect(message.nativeElement.textContent).toBe('Test message');
  });

  it('should emit a reload event when icon is clicked', (done) => {
    component.icon = 'testIcon';
    fixture.detectChanges();

    const iconButton = fixture.debugElement.query(
      By.css('button.reload-button')
    );
    expect(iconButton).toBeTruthy();

    component.reload.subscribe(() => {
      expect(iconButton.nativeElement.textContent).toBe('testIcon');
      done();
    });

    iconButton.nativeElement.click();
  });
});
