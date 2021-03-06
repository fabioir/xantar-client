import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { IMealSumup } from '@xantar/domain/models';
import { of } from 'rxjs';
import { ApiService } from '../../../../services/api/api.service';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { SharedModule } from '../../../shared/shared.module';
import { MealItemComponent } from '../meal-item/meal-item.component';
import { MealsListComponent } from './meals-list.component';
import { mockMeal } from './meals-list.mock';

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatListModule,
  MatDialogModule
];

describe('MealsListComponent', () => {
  let component: MealsListComponent;
  let fixture: ComponentFixture<MealsListComponent>;
  let httpTestingController: HttpTestingController;

  afterEach(() => {
    httpTestingController?.verify();
  });

  describe('Unit tests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [MealsListComponent, MealItemComponent],
        imports: [
          MatListModule,
          SharedModule,
          HttpClientTestingModule,
          getTranslocoModule(),
          ...materialModules
        ],
        providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }]
      }).compileComponents();
    });

    beforeEach(() => {
      TestBed.inject(ApiService).init();
      fixture = TestBed.createComponent(MealsListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [MealsListComponent, MealItemComponent],
        imports: [
          ...materialModules,
          SharedModule,
          HttpClientTestingModule,
          getTranslocoModule()
        ],
        providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }]
      }).compileComponents();
    });

    beforeEach(() => {
      httpTestingController = TestBed.inject(HttpTestingController);
      TestBed.inject(ApiService).init();
      fixture = TestBed.createComponent(MealsListComponent);
      component = fixture.componentInstance;
    });

    it('should render a meal item info', () => {
      fixture.detectChanges();
      httpTestingController
        .expectOne((req) => req.url === '/api/meals')
        .flush([mockMeal]);
      fixture.detectChanges();

      const mealItemName = fixture.debugElement.query(
        By.css('.meal-name')
      ).nativeElement;

      expect(mealItemName).toBeTruthy();
      expect(mealItemName.textContent).toBe(mockMeal.name);

      const mealItemDescription = fixture.debugElement.query(
        By.css('.meal-description')
      ).nativeElement;

      expect(mealItemDescription).toBeTruthy();
      expect(mealItemDescription.textContent).toBe(mockMeal.description);
    });

    it('should reload meals on reload button click', () => {
      const getMealsListSpy = jest
        .spyOn(component['mealsService'], 'getMealsList')
        .mockReturnValue(of(null as unknown as IMealSumup[]));
      fixture.detectChanges();

      expect(getMealsListSpy).toHaveBeenCalledTimes(1);

      const reloadButton = fixture.debugElement.query(
        By.css('button.reload-button')
      );
      expect(reloadButton).toBeTruthy();
      reloadButton.nativeElement.click();

      expect(getMealsListSpy).toHaveBeenCalledTimes(2);
      getMealsListSpy.mockRestore();
    });

    describe('deleteMeal', () => {
      it('should call meal deleting and reload', () => {
        const deleteMealWithDialogSpy = jest
          .spyOn(component['mealsService'], 'deleteMealWithDialog')
          .mockImplementation(() => of(true));
        const reloadSpy = jest
          .spyOn(component, 'reload')
          .mockImplementation(jest.fn);

        component.deleteMeal(mockMeal);

        expect(deleteMealWithDialogSpy).toHaveBeenCalledWith(mockMeal);
        expect(reloadSpy).toHaveBeenCalled();

        deleteMealWithDialogSpy.mockClear();
        reloadSpy.mockClear();
      });

      it('should call meal deleting and not reload if delete fails', () => {
        const deleteMealWithDialogSpy = jest
          .spyOn(component['mealsService'], 'deleteMealWithDialog')
          .mockImplementation(() => of(false));
        const reloadSpy = jest
          .spyOn(component, 'reload')
          .mockImplementation(jest.fn);

        component.deleteMeal(mockMeal);

        expect(deleteMealWithDialogSpy).toHaveBeenCalledWith(mockMeal);
        expect(reloadSpy).not.toHaveBeenCalled();

        deleteMealWithDialogSpy.mockClear();
        reloadSpy.mockClear();
      });
    });

    describe('editMeal', () => {
      beforeEach(() => {
        fixture.detectChanges();
        httpTestingController
          .expectOne((req) => req.url === '/api/meals')
          .flush([mockMeal]);
        fixture.detectChanges();
      });

      it('should edit a meal and update the meal-item', fakeAsync(() => {
        const editedMeal: IMealSumup = { ...mockMeal, name: 'Edited name' };
        const editMealWithDialogSpy = jest
          .spyOn(component['mealsService'], 'editMealWithDialog')
          .mockImplementation(() => of(editedMeal));

        component.editMeal(mockMeal);

        flushMicrotasks();

        expect(editMealWithDialogSpy).toHaveBeenCalledWith(mockMeal);
        expect(component['meals']).toBeTruthy();
        expect(component['meals'].length).toBe(1);
        expect(component['meals'][0]).toStrictEqual(editedMeal);

        editMealWithDialogSpy.mockRestore();
      }));

      it('should edit a meal and not update the meal-item if not found', fakeAsync(() => {
        const editedMeal: IMealSumup = {
          ...mockMeal,
          id: 'id not found in meals list'
        };
        const editMealWithDialogSpy = jest
          .spyOn(component['mealsService'], 'editMealWithDialog')
          .mockImplementation(() => of(editedMeal));

        component.editMeal(mockMeal);

        flushMicrotasks();

        expect(editMealWithDialogSpy).toHaveBeenCalledWith(mockMeal);
        expect(component['meals']).toBeTruthy();
        expect(component['meals'].length).toBe(1);
        expect(component['meals'][0]).not.toStrictEqual(editedMeal);

        editMealWithDialogSpy.mockRestore();
      }));

      it('should edit a meal and not update the return value is falsy found', fakeAsync(() => {
        const editedMeal: IMealSumup = {
          ...mockMeal,
          name: 'Edited name'
        };
        const editMealWithDialogSpy = jest
          .spyOn(component['mealsService'], 'editMealWithDialog')
          .mockImplementation(() => of(null));

        component.editMeal(mockMeal);

        flushMicrotasks();

        expect(editMealWithDialogSpy).toHaveBeenCalledWith(mockMeal);
        expect(component['meals']).toBeTruthy();
        expect(component['meals'].length).toBe(1);
        expect(component['meals'][0]).not.toStrictEqual(editedMeal);

        editMealWithDialogSpy.mockRestore();
      }));
    });
  });
});
