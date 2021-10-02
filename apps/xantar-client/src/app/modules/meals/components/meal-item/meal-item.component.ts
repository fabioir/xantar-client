import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { IMealSumup } from '@xantar/domain/models';

@Component({
  selector: 'xantar-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealItemComponent {
  public hovered = false;

  @Input() meal!: IMealSumup;
  @Input() tooltips = { delete: 'Delete meal', edit: 'Edit meal' };

  @Output() deleteMeal: EventEmitter<IMealSumup> = new EventEmitter();
  @Output() editMeal: EventEmitter<IMealSumup> = new EventEmitter();
}
