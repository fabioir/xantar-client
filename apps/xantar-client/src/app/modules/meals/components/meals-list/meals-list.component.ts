import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IMealSumup } from '@xantar/domain/models';
import { mockMeal } from './meals-list.mock';

@Component({
  selector: 'xantar-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealsListComponent {
  public meals: IMealSumup[] = [
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal,
    mockMeal
  ];
}
