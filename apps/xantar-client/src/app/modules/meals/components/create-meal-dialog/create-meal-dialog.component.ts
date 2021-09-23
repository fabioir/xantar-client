import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'xantar-create-meal-dialog',
  templateUrl: './create-meal-dialog.component.html',
  styleUrls: ['./create-meal-dialog.component.scss']
})
export class CreateMealDialogComponent {
  constructor(private dialogRef: MatDialogRef<CreateMealDialogComponent>) {}
}
