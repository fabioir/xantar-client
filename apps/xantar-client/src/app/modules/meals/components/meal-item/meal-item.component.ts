import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMealSumup } from '@xantar/domain/models';

@Component({
  selector: 'xantar-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealItemComponent {
  @Input() meal!: IMealSumup;
}
