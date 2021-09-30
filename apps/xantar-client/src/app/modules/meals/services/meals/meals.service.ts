import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import {
  HttpMethodEnum,
  IConfirmationData,
  IMealSumup
} from '@xantar/domain/models';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from '../../../../services/api/api.service';
import { MealsEndpoint } from '../../../../services/api/endpoints.relation';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CreateMealDialogComponent } from '../../components/create-meal-dialog/create-meal-dialog.component';

@Injectable()
export class MealsService {
  constructor(
    private api: ApiService,
    private http: HttpClient,
    private dialog: MatDialog,
    private translocoService: TranslocoService
  ) {}

  public getMealsList(): Observable<IMealSumup[]> {
    const endpoint = this.api.getEndpoint('meals');
    const url = endpoint.getUrlForMethod(HttpMethodEnum.GET);

    return this.http.get<IMealSumup[]>(url);
  }

  public addNewMeal() {
    const dialogRef = this.dialog.open(CreateMealDialogComponent, {
      panelClass: 'create-meal-dialog',
      ariaLabel: this.translocoService.translate('meals.create.add_meal'),
      minWidth: '55%'
    });
    dialogRef
      .afterClosed()
      .subscribe((newMeal: IMealSumup) => this.createMeal(newMeal).subscribe());
  }

  public createMeal(newMeal: IMealSumup): Observable<IMealSumup> {
    const endpoint = this.api.getEndpoint('meals');
    const url = endpoint.getUrlForMethod(HttpMethodEnum.POST);

    return this.http.post<IMealSumup>(url, newMeal);
  }

  public deleteMealWithDialog(meal: IMealSumup): Observable<boolean> {
    const deleteConfirmationData: IConfirmationData = {
      title: this.translocoService.translate(
        'meals.delete.confirmation.title',
        { meal: meal.name }
      ),
      caption: this.translocoService.translate(
        'meals.delete.confirmation.caption'
      ),
      cancel: this.translocoService.translate(
        'meals.delete.confirmation.cancel'
      ),
      confirm: this.translocoService.translate(
        'meals.delete.confirmation.confirm'
      )
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'delete-meal-dialog',
      ariaLabel: this.translocoService.translate('meals.delete.dialog_label'),
      data: deleteConfirmationData
    });

    return dialogRef.afterClosed().pipe(
      mergeMap((confirmed) => {
        if (confirmed) {
          return this.deleteMeal(meal);
        } else {
          return of(false);
        }
      })
    );
  }

  public deleteMeal(meal: IMealSumup): Observable<boolean> {
    const endpoint = this.api.getEndpoint('meals');
    const url = (endpoint as MealsEndpoint).getUrlForMethod(
      HttpMethodEnum.DELETE,
      { id: meal.id }
    );

    return this.http.delete<unknown>(url).pipe(
      catchError((error) => {
        console.error(`Error trying to delete a meal:\n${error?.message}`);
        return of(false);
      }),
      map((result) => result !== false)
    );
  }

  public editMealWithDialog(meal: IMealSumup): Observable<IMealSumup | null> {
    return of(meal);
  }
}
