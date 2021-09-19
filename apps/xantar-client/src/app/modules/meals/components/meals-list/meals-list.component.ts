import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IMealSumup } from '@xantar/domain/models';
import { Observable } from 'rxjs';
import { MealsService } from '../../services/meals/meals.service';

@Component({
  selector: 'xantar-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MealsService]
})
export class MealsListComponent implements OnInit {
  public meals!: Observable<IMealSumup[]>;

  constructor(private mealsService: MealsService) {}

  ngOnInit() {
    this.meals = this.mealsService.getMealsList();
  }

  public reload() {
    this.meals = this.mealsService.getMealsList();
  }
}
