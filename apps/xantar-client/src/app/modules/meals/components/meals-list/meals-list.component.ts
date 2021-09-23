import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { IIconButtonSettings, IMealSumup } from '@xantar/domain/models';
import { Observable, Subject, Subscription } from 'rxjs';
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

  public meals!: Observable<IMealSumup[]>;

  constructor(
    private mealsService: MealsService,
    private toolbarService: ToolbarService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.meals = this.mealsService.getMealsList();
    this._setAddMealButton();
    this.toolbarService.title =
      this.translocoService.translate('meals.meals_list');
  }

  ngOnDestroy() {
    this.addMealSubject.complete();
    this.toolbarService.addButtonSettings = null;
    this.subscriptions.unsubscribe();
  }

  public reload() {
    this.meals = this.mealsService.getMealsList();
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
