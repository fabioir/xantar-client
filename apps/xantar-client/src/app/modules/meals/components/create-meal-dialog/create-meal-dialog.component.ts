import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { TranslocoService } from '@ngneat/transloco';
import { IMealSumup, ISlot, slotsList } from '@xantar/domain/models';

@Component({
  selector: 'xantar-create-meal-dialog',
  templateUrl: './create-meal-dialog.component.html',
  styleUrls: ['./create-meal-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMealDialogComponent {
  public slotsList: ISlot[] = Object.values(slotsList);
  public slotsTextValue = '';
  public attributes: string[] = [];
  public mealForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    description: new FormControl('', [Validators.maxLength(400)]),
    image: new FormControl(null),
    slots: new FormControl(null),
    attributes: new FormControl(null)
  });

  constructor(
    public dialogRef: MatDialogRef<CreateMealDialogComponent>,
    private translocoService: TranslocoService
  ) {}

  public onImageSelected(event: { files: FileList | null }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!event || !(event as any).files.length) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      this.mealForm.get('image')?.patchValue(reader?.result);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.readAsDataURL((event as any).files[0] as Blob);
  }

  public slotSelectionChange(event: MatSelectChange) {
    if (event.value.length > 0) {
      this.slotsTextValue = event.value
        .reduce((acc: string, value: ISlot) => {
          return (
            acc +
            `, ${this.translocoService.translate('meals.slots.' + value.name)}`
          );
        }, '')
        .substr(2);
    } else {
      this.slotsTextValue = '';
    }
  }

  public removeAttribute(attr: string) {
    const attrIndx = this.attributes.findIndex(
      (attribute) => attribute === attr
    );
    if (attrIndx > -1) {
      this.attributes.splice(attrIndx, 1);
      this.mealForm.get('attributes')?.patchValue(this.attributes);
    }
  }

  public addAttr(event: MatChipInputEvent) {
    if (event.value) {
      if (!this.attributes.find((attribute) => attribute === event.value)) {
        this.attributes.push(event.value);
        this.mealForm.get('attributes')?.patchValue(this.attributes);
      }
    }
    event.chipInput?.clear();
  }

  public submit() {
    const newMeal: IMealSumup = {
      name: this.mealForm.get('name')?.value,
      description: this.mealForm.get('description')?.value,
      imageThumb: this.mealForm.get('image')?.value,
      slots: this.mealForm.get('slots')?.value,
      attributes: this.mealForm.get('attributes')?.value
    } as IMealSumup;

    this.dialogRef.close(newMeal);
  }
}
