import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsListComponent } from './components/meals-list/meals-list.component';

const routes: Routes = [
  {
    path: '',
    component: MealsListComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class MealsRoutingModule {}
