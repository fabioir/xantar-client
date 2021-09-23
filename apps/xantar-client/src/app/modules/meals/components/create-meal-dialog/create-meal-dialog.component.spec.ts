import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateMealDialogComponent } from './create-meal-dialog.component';

@Component({
  selector: 'xantar-dialog-launch-component'
})
class DialogLaunchComponent {
  constructor(private dialog: MatDialog) {}

  public openCreateMealDialog(): MatDialogRef<CreateMealDialogComponent> {
    return this.dialog.open(CreateMealDialogComponent);
  }
}

describe('CreateMealDialogComponent', () => {
  let component: DialogLaunchComponent;
  let fixture: ComponentFixture<DialogLaunchComponent>;
  let rootLoader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMealDialogComponent, DialogLaunchComponent],
      imports: [MatDialogModule, BrowserAnimationsModule],
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
    await Promise.all(dialogs.map(async (d) => await d.close()));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog', async () => {
    const dialogRef = component.openCreateMealDialog();

    expect(dialogRef).toBeTruthy();

    const dialog = await rootLoader.getHarness(MatDialogHarness);
    expect(dialog).toBeDefined();
  });
});
