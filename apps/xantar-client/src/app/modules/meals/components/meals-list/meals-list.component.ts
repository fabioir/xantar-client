import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { IIconButtonSettings, IMealSumup } from '@xantar/domain/models';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ToolbarService } from '../../../shared/services/toolbar/toolbar.service';
import { MealsService } from '../../services/meals/meals.service';

@Component({
  selector: 'xantar-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MealsService]
})
export class MealsListComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private addMealSubject = new Subject<boolean>();
  private meals!: IMealSumup[];
  private mealsSubject = new Subject<IMealSumup[]>();

  public meals$ = this.mealsSubject.asObservable();

  constructor(
    private mealsService: MealsService,
    private toolbarService: ToolbarService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this._fetchMeals();
    this._setAddMealButton();
    this.toolbarService.title =
      this.translocoService.translate('meals.meals_list');
  }

  private _fetchMeals(): void {
    this.mealsService.getMealsList().subscribe((mealsList) => {
      this.meals = mealsList;
      this.mealsSubject.next(this.meals);
    });
  }

  ngOnDestroy() {
    this.addMealSubject.complete();
    this.toolbarService.addButtonSettings = null;
    this.subscriptions.unsubscribe();
    this.mealsSubject.complete();
  }

  public reload() {
    this._fetchMeals();
  }

  public deleteMeal(meal: IMealSumup) {
    this.mealsService
      .deleteMealWithDialog(meal)
      .pipe(filter((deleteSuccessful: boolean) => deleteSuccessful))
      .subscribe(this.reload.bind(this));
  }

  public editMeal(meal: IMealSumup) {
    this.mealsService
      .editMealWithDialog(meal)
      .pipe(filter((editedMeal) => !!editedMeal))
      .subscribe((editedMeal: IMealSumup | null) => {
        const mealIndex = this.meals.findIndex(
          (mealItem) => mealItem.id === (editedMeal as IMealSumup).id
        );
        if (mealIndex > -1) {
          this.meals[mealIndex] = editedMeal as IMealSumup;
          this.mealsSubject.next(this.meals);
        }
      });
  }

  private _setAddMealButton() {
    this.subscriptions.add(
      this.addMealSubject
        .asObservable()
        .subscribe(this._createNewMeal.bind(this))
    );

    const addButtonSettings: IIconButtonSettings = {
      tooltip: this.translocoService.translate('meals.create.add_meal'),
      clickSubject: this.addMealSubject
    };

    this.toolbarService.addButtonSettings = addButtonSettings;
  }

  private _createNewMeal() {
    this.mealsService.addNewMeal();
  }
}
