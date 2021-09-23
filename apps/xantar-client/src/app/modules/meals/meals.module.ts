import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '../shared/shared.module';
import { CreateMealDialogComponent } from './components/create-meal-dialog/create-meal-dialog.component';
import { MealItemComponent } from './components/meal-item/meal-item.component';
import { MealsListComponent } from './components/meals-list/meals-list.component';
import { MealsRoutingModule } from './meals-routing.module';

const materialModules = [MatListModule];

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
    TranslocoModule
  ]
})
export class MealsModule {}
