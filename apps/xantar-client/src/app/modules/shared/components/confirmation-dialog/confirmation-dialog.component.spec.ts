import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Component({
  selector: 'xantar-dialog-launch-component'
})
class DialogLaunchComponent {
  constructor(private dialog: MatDialog) {}

  public openConfirmationDialog(
    config: MatDialogConfig
  ): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, config);
  }
}

describe('ConfirmationDialogComponent from launcher', () => {
  let component: DialogLaunchComponent;
  let fixture: ComponentFixture<DialogLaunchComponent>;
  let rootLoader: HarnessLoader;

  beforeEach(async () => {
    const materialModules = [MatButtonModule, MatDialogModule];

    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [...materialModules, BrowserAnimationsModule],
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  afterEach(async () => {
    const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
    await Promise.all(dialogs.map(async (d) => d.close()));
  });

  it('should open the dialog', async () => {
    const dialogRef = component.openConfirmationDialog({
      data: {
        title: 'meals.delete.confirmation.title',
        caption: 'meals.delete.confirmation.caption',
        cancel: 'meals.delete.confirmation.cancel',
        confirm: 'meals.delete.confirmation.confirm'
      }
    });

    expect(dialogRef).toBeTruthy();

    const dialog = await rootLoader.getHarness(MatDialogHarness);
    expect(dialog).toBeDefined();
  });
});

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let rootLoader: HarnessLoader;

  beforeEach(async () => {
    const materialModules = [MatButtonModule, MatDialogModule];

    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [...materialModules, BrowserAnimationsModule],
      providers: [
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'meals.delete.confirmation.title',
            caption: 'meals.delete.confirmation.caption',
            cancel: 'meals.delete.confirmation.cancel',
            confirm: 'meals.delete.confirmation.confirm'
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  afterEach(async () => {
    const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
    await Promise.all(dialogs.map(async (d) => d.close()));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show title', () => {
    const title = fixture.debugElement.query(By.css('.title'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toBe(
      'meals.delete.confirmation.title'
    );
  });

  it('should show caption', () => {
    const title = fixture.debugElement.query(By.css('.caption'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toBe(
      'meals.delete.confirmation.caption'
    );
  });

  it('should return false on cancel button click', async () => {
    const dialogRefCloseSpy = jest.spyOn(component.dialogRef, 'close');
    const cancelButtonHarness = await rootLoader.getHarness(
      MatButtonHarness.with({ selector: '.cancel-button' })
    );
    expect(cancelButtonHarness).toBeTruthy();

    const buttonText = await cancelButtonHarness.getText();
    expect(buttonText).toBe('MEALS.DELETE.CONFIRMATION.CANCEL');

    expect(dialogRefCloseSpy).not.toHaveBeenCalled();
    await cancelButtonHarness.click();
    expect(dialogRefCloseSpy).toHaveBeenCalledWith(false);

    dialogRefCloseSpy.mockRestore();
  });

  it('should return false on cancel button click', async () => {
    const dialogRefCloseSpy = jest.spyOn(component.dialogRef, 'close');
    const confirmButtonHarness = await rootLoader.getHarness(
      MatButtonHarness.with({ selector: '.confirm-button' })
    );
    expect(confirmButtonHarness).toBeTruthy();

    const buttonText = await confirmButtonHarness.getText();
    expect(buttonText).toBe('MEALS.DELETE.CONFIRMATION.CONFIRM');

    expect(dialogRefCloseSpy).not.toHaveBeenCalled();
    await confirmButtonHarness.click();
    expect(dialogRefCloseSpy).toHaveBeenCalledWith(true);

    dialogRefCloseSpy.mockRestore();
  });
});
