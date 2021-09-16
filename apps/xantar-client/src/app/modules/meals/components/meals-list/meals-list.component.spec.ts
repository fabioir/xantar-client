import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { MealItemComponent } from '../meal-item/meal-item.component';

import { mockMeal } from './meals-list.mock';

import { MealsListComponent } from './meals-list.component';
import { ApiService } from '../../../../services/api/api.service';
import { SharedModule } from '../../../shared/shared.module';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

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
        imports: [MatListModule, SharedModule, HttpClientTestingModule],
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
        imports: [MatListModule, SharedModule, HttpClientTestingModule],
        providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }]
      }).compileComponents();
    });

    beforeEach(() => {
      httpTestingController = TestBed.inject(HttpTestingController);
      TestBed.inject(ApiService).init();
      fixture = TestBed.createComponent(MealsListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render a meal item info', () => {
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
  });
});
