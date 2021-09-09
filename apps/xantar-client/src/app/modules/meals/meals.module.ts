import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsRoutingModule } from './meals-routing.module';
import { MealsListComponent } from './meals-list/meals-list.component';

@NgModule({
  declarations: [
    MealsListComponent
  ],
  imports: [CommonModule, MealsRoutingModule],
})
export class MealsModule {}
