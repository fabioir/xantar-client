import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { HttpMethodEnum, IMealSumup } from '@xantar/domain/models';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../services/api/api.service';
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
}
