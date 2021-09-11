import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { MealItemComponent } from '../meal-item/meal-item.component';

import { mockMeal } from './meals-list.mock';

import { MealsListComponent } from './meals-list.component';

describe('MealsListComponent', () => {
  let component: MealsListComponent;
  let fixture: ComponentFixture<MealsListComponent>;

  describe('Unit tests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [MealsListComponent]
      }).compileComponents();
    });

    beforeEach(() => {
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
        imports: [MatListModule]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(MealsListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render a meal item info', () => {
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
