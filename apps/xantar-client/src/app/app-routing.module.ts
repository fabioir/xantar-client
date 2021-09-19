import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'meals',
    loadChildren: () =>
      import('./modules/meals/meals.module').then((m) => m.MealsModule),
  },
  { path: '', redirectTo: '/meals', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
