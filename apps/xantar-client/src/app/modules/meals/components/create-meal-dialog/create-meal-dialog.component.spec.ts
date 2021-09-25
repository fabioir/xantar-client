import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getTranslocoModule } from '../../../../transloco-testing.module';
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
    const materialModules = [
      MatListModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatSelectModule,
      MatChipsModule,
      MatDialogModule,
      ReactiveFormsModule
    ];
    await TestBed.configureTestingModule({
      declarations: [CreateMealDialogComponent, DialogLaunchComponent],
      imports: [
        ...materialModules,
        BrowserAnimationsModule,
        getTranslocoModule()
      ],
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
