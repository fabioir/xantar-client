import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsRoutingModule } from './meals-routing.module';
import { MealsListComponent } from './components/meals-list/meals-list.component';
import { MealItemComponent } from './components/meal-item/meal-item.component';

import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';

const materialModules = [MatListModule];

@NgModule({
  declarations: [MealsListComponent, MealItemComponent],
  imports: [CommonModule, MealsRoutingModule, ...materialModules, SharedModule]
})
export class MealsModule {}
