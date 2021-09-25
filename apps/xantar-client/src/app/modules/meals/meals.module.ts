import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '../shared/shared.module';
import { CreateMealDialogComponent } from './components/create-meal-dialog/create-meal-dialog.component';
import { MealItemComponent } from './components/meal-item/meal-item.component';
import { MealsListComponent } from './components/meals-list/meals-list.component';
import { MealsRoutingModule } from './meals-routing.module';

const materialModules = [
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatChipsModule
];

@NgModule({
  declarations: [
    MealsListComponent,
    MealItemComponent,
    CreateMealDialogComponent
  ],
  imports: [
    CommonModule,
    MealsRoutingModule,
    ...materialModules,
    SharedModule,
    TranslocoModule,
    ReactiveFormsModule
  ]
})
export class MealsModule {}
