import { HarnessLoader, TestKey } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {
  MatChipHarness,
  MatChipInputHarness,
  MatChipListHarness
} from '@angular/material/chips/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatListModule } from '@angular/material/list';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSelectHarness } from '@angular/material/select/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IMealSumup, ISlot, slotsList } from '@xantar/domain/models';
import { from } from 'rxjs';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { mockMeal } from '../meals-list/meals-list.mock';
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

describe('CreateMealDialogComponent from launcher', () => {
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
    await Promise.all(dialogs.map(async (d) => d.close()));
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

  describe('Mat inputs', () => {
    let dialogRef: MatDialogRef<CreateMealDialogComponent>;
    let dialogHarness: MatDialogHarness;

    beforeEach(async () => {
      dialogRef = component.openCreateMealDialog();
      dialogHarness = await rootLoader.getHarness(MatDialogHarness);
    });

    it('should cancel the creation', (done) => {
      from(
        dialogHarness.getHarness(
          MatButtonHarness.with({ selector: '.cancel-button' })
        )
      ).subscribe((cancelButtonHarness: MatButtonHarness) => {
        expect(cancelButtonHarness).toBeTruthy();
        dialogRef.afterClosed().subscribe((mealSumup) => {
          expect(mealSumup).toBeNull();
          done();
        });
        cancelButtonHarness.click();
      });
    });
  });
});

describe('CreateMealDialogComponent', () => {
  let file: File;
  let component: CreateMealDialogComponent;
  let fixture: ComponentFixture<CreateMealDialogComponent>;

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
    file = new File(['test'], 'test.jpeg');

    await TestBed.configureTestingModule({
      declarations: [CreateMealDialogComponent],
      imports: [
        ...materialModules,
        BrowserAnimationsModule,
        getTranslocoModule()
      ],
      providers: [
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: null
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('Unit Tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('onImageSelected', () => {
      it('should return without loading if file is null', (done) => {
        expect(component.mealForm.get('imageThumb')?.value).toBeNull();

        component
          .onImageSelected({ files: [] as unknown as FileList })
          .subscribe({
            complete: () => {
              expect(component.mealForm.get('imageThumb')?.value).toBeNull();
              done();
            }
          });
      });

      it('should load a file', (done) => {
        expect(component.mealForm.get('imageThumb')?.value).toBeNull();

        component
          .onImageSelected({ files: [file] as unknown as FileList })
          .subscribe(() => {
            expect(component.mealForm.get('imageThumb')?.value).toBe(
              'data:application/octet-stream;base64,dGVzdA=='
            );
            done();
          });
      });
    });

    describe('slotSelectionChange', () => {
      it('should set text value to ""', () => {
        component.slotsTextValue = 'test';
        expect(component.slotsTextValue).toBe('test');

        component.slotSelectionChange({ value: [] } as MatSelectChange);
        expect(component.slotsTextValue).toBe('');
      });

      it('should translate and concatenate slots', () => {
        component.slotSelectionChange({
          value: ['slot1', 'slot2', 'slot3']
        } as MatSelectChange);
        expect(component.slotsTextValue).toBe(
          'meals.slots.undefined, meals.slots.undefined, meals.slots.undefined'
        );
      });
    });

    describe('removeAttribute', () => {
      it('should remove an attribute', () => {
        component.attributes = ['attr1', 'attr2', 'attr3'];

        component.removeAttribute('attr2');
        expect(component.attributes).toHaveLength(2);
        expect(component.attributes).not.toContain('attr2');
      });

      it('should not remove an attribute if not found', () => {
        component.attributes = ['attr1', 'attr2', 'attr3'];

        component.removeAttribute('attrX');
        expect(component.attributes).toHaveLength(3);
      });
    });

    describe('addAttr', () => {
      it('should add an attribute', () => {
        expect(component.mealForm.get('attributes')?.value).toBeNull();
        expect(component.attributes).toHaveLength(0);

        component.addAttr({ value: 'attribute' } as MatChipInputEvent);

        expect(component.attributes).toHaveLength(1);
        expect(component.attributes).toContain('attribute');
        expect(component.mealForm.get('attributes')?.value).toContain(
          'attribute'
        );
      });

      it('should not add an attribute if it is falsy', () => {
        component.addAttr({ value: '' } as MatChipInputEvent);

        expect(component.attributes).toHaveLength(0);
        expect(component.mealForm.get('attributes')?.value).toBeNull();
      });

      it('should not add a duplicate attribute', () => {
        component.attributes = ['attr1'];
        component.addAttr({ value: 'attr1' } as MatChipInputEvent);
        component.mealForm.get('attributes')?.patchValue(component.attributes);

        expect(component.attributes).toHaveLength(1);
        expect(component.attributes).toContain('attr1');
        expect(component.mealForm.get('attributes')?.value).toContain('attr1');
      });

      it('should call MatChipInput clear function', () => {
        const mockChipEvent = {
          value: 'attr1',
          chipInput: { clear: jest.fn() } as unknown
        } as MatChipInputEvent;
        component.addAttr(mockChipEvent);

        expect(mockChipEvent.chipInput?.clear).toHaveBeenCalled();
      });
    });

    describe('submit', () => {
      it('should extract data from FormGroup and return it through the dialog ref', () => {
        const mockMealSumup: IMealSumup = {
          name: 'test name',
          description: 'test description',
          imageThumb: 'test image',
          slots: [slotsList.breakfast],
          attributes: ['test attribute']
        } as unknown as IMealSumup;

        const closeSpy = jest.spyOn(component['dialogRef'], 'close');

        expect(closeSpy).not.toHaveBeenCalled();

        component.mealForm.patchValue(mockMealSumup);
        component.submit();

        expect(closeSpy).toHaveBeenCalledWith(mockMealSumup);
      });
    });

    describe('_createForm', () => {
      it('should create a form group for a meal creation', () => {
        const form = component['_createForm'](null as unknown as IMealSumup);

        expect(form).toBeTruthy();
        expect(form.get('name')?.value).toBe('');
        expect(form.get('description')?.value).toBe('');
        expect(form.get('imageThumb')?.value).toBeNull();
        expect(form.get('slots')?.value).toBeNull();
        expect(form.get('attributes')?.value).toBeNull();
      });

      it('should create a form with the values from a meal to edit', () => {
        const form = component['_createForm'](mockMeal);

        expect(form).toBeTruthy();
        expect(form.get('name')?.value).toBe(mockMeal.name);
        expect(form.get('description')?.value).toBe(mockMeal.description);
        expect(form.get('imageThumb')?.value).toBe(mockMeal.imageThumb);
        expect(form.get('slots')?.value).toStrictEqual(mockMeal.slots);
        expect(form.get('attributes')?.value).toStrictEqual(
          mockMeal.attributes
        );
      });
    });

    describe('_getSlotsTextValue', () => {
      it('should concatenate slots readaable names', () => {
        const text = component['_getSlotsTextValue']([
          slotsList.breakfast,
          slotsList.dinner
        ]);

        expect(text).toBe('meals.slots.BREAKFAST, meals.slots.DINNER');
      });

      it('should return "" on empty slots list or falsy value', () => {
        expect(component['_getSlotsTextValue']([])).toBe('');
        expect(
          component['_getSlotsTextValue'](undefined as unknown as ISlot[])
        ).toBe('');
      });
    });

    describe('slotsCompare', () => {
      it('should return true for slots with the same id', () => {
        const equalSlots = component.slotsCompare(
          { id: 0, name: 'slot1' },
          { id: 0, name: 'slot2' }
        );
        expect(equalSlots).toBe(true);
      });
      it('should return false for defined slots with different id', () => {
        expect(
          component.slotsCompare(
            { id: 0, name: 'same name' },
            { id: 1, name: 'same name' }
          )
        ).toBe(false);
        expect(
          component.slotsCompare(
            { id: undefined as unknown as number, name: 'same name' },
            { id: 1, name: 'same name' }
          )
        ).toBe(false);
        expect(
          component.slotsCompare(
            { id: undefined as unknown as number, name: 'same name' },
            { id: undefined as unknown as number, name: 'same name' }
          )
        ).toBe(false);
        expect(
          component.slotsCompare(null as unknown as ISlot, {
            id: 1,
            name: 'same name'
          })
        ).toBe(false);
        expect(
          component.slotsCompare(
            null as unknown as ISlot,
            null as unknown as ISlot
          )
        ).toBe(false);
      });
    });
  });

  describe('Integration Tests', () => {
    let rootLoader: HarnessLoader;

    beforeEach(() => {
      rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    });

    afterEach(async () => {
      const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
      await Promise.all(dialogs.map(async (d) => d.close()));
    });

    it('should show name input', async () => {
      const nameInputHarness = await rootLoader.getHarness(
        MatInputHarness.with({ selector: '.name-input' })
      );
      await nameInputHarness.setValue('test name');

      expect(component.mealForm.get('name')?.value).toBe('test name');
    });

    it('should show description input', async () => {
      const descriptionInputHarness = await rootLoader.getHarness(
        MatInputHarness.with({ selector: '.description-input' })
      );
      await descriptionInputHarness.setValue('test description');

      expect(component.mealForm.get('description')?.value).toBe(
        'test description'
      );
    });

    it('should show select input', async () => {
      const slotSelectHarness = await rootLoader.getHarness(
        MatSelectHarness.with({ selector: '.slots-input' })
      );
      await slotSelectHarness.clickOptions();

      expect(JSON.stringify(component.mealForm.get('slots')?.value)).toBe(
        JSON.stringify([
          { id: 1, name: 'BREAKFAST' },
          { id: 2, name: 'SNACK1' },
          { id: 3, name: 'LUNCH' },
          { id: 4, name: 'SNACK2' },
          { id: 5, name: 'DINNER' }
        ])
      );
    });

    describe('chips list', () => {
      it('should show attributes input', async () => {
        const chipInputHarness = await rootLoader.getHarness(
          MatChipInputHarness
        );

        await chipInputHarness.setValue('test-attribute');
        await chipInputHarness.sendSeparatorKey(TestKey.ENTER);

        const chipListHarness = await rootLoader.getHarness(
          MatChipListHarness.with({ selector: '.attributes-input' })
        );
        expect(chipListHarness).toBeTruthy();

        const chips: MatChipHarness[] = await chipListHarness.getChips();

        expect(chips?.length).toBe(1);

        const chipText = await chips[0].getText();
        expect(chipText).toBe('test-attribute');

        const attributes: string[] =
          component.mealForm.get('attributes')?.value;
        expect(attributes.length).toBe(1);
        expect(attributes[0]).toBe('test-attribute');
      });

      it('should delete attributes input', async () => {
        const chipInputHarness = await rootLoader.getHarness(
          MatChipInputHarness
        );

        await chipInputHarness.setValue('test-attribute');
        await chipInputHarness.sendSeparatorKey(TestKey.ENTER);

        const chipListHarness = await rootLoader.getHarness(
          MatChipListHarness.with({ selector: '.attributes-input' })
        );

        const chips: MatChipHarness[] = await chipListHarness.getChips();

        expect(chips?.length).toBe(1);

        await chips[0].remove();

        const attributes: string[] =
          component.mealForm.get('attributes')?.value;
        expect(attributes.length).toBe(0);
      });
    });
  });
});
