import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { TranslocoService } from '@ngneat/transloco';
import { IMealSumup, ISlot, slotsList } from '@xantar/domain/models';
import { EMPTY, Observable, Subject } from 'rxjs';

@Component({
  selector: 'xantar-create-meal-dialog',
  templateUrl: './create-meal-dialog.component.html',
  styleUrls: ['./create-meal-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMealDialogComponent implements OnInit {
  public slotsList: ISlot[] = Object.values(slotsList);
  public slotsTextValue = '';
  public attributes: string[] = [];

  public mealForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateMealDialogComponent>,
    private translocoService: TranslocoService,
    @Inject(MAT_DIALOG_DATA) public mealToEdit: IMealSumup
  ) {}

  ngOnInit() {
    if (this.mealToEdit) {
      this.slotsTextValue = this._getSlotsTextValue(this.mealToEdit.slots);
    }
    this.mealForm = this._createForm(this.mealToEdit);
  }

  public onImageSelected(event: { files: FileList | null }): Observable<never> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!event || !(event as any).files.length) {
      return EMPTY;
    }
    const subject = new Subject<never>();
    const reader = new FileReader();
    reader.onloadend = () => {
      this.mealForm.get('imageThumb')?.patchValue(reader?.result);
      subject.next();
      subject.complete();
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.readAsDataURL((event as any).files[0] as Blob);
    return subject.asObservable();
  }

  public slotSelectionChange(event: MatSelectChange) {
    this.slotsTextValue = this._getSlotsTextValue(event?.value);
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
      imageThumb: this.mealForm
        .get('imageThumb')
        ?.value?.replace('data:image/jpeg;base64,', '')
        .trim(),
      slots: this.mealForm.get('slots')?.value,
      attributes: this.mealForm.get('attributes')?.value
    } as IMealSumup;

    this.dialogRef.close(newMeal);
  }

  public slotsCompare(slot1: ISlot, slot2: ISlot): boolean {
    return slot1 && slot2 && slot1?.id === slot2?.id;
  }

  private _getSlotsTextValue(slots: ISlot[]): string {
    if (slots && slots.length > 0) {
      return slots
        .reduce((acc: string, value: ISlot) => {
          return (
            acc +
            `, ${this.translocoService.translate('meals.slots.' + value.name)}`
          );
        }, '')
        .substr(2);
    } else {
      return '';
    }
  }

  private _createForm(mealToEdit: IMealSumup): FormGroup {
    return new FormGroup({
      name: new FormControl(mealToEdit?.name || '', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      description: new FormControl(mealToEdit?.description || '', [
        Validators.maxLength(400)
      ]),
      imageThumb: new FormControl(mealToEdit?.imageThumb || null),
      slots: new FormControl(mealToEdit?.slots || null),
      attributes: new FormControl(mealToEdit?.attributes || null)
    });
  }
}
