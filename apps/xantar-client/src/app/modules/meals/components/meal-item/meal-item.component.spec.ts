import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../../shared/shared.module';
import { mockMeal } from '../meals-list/meals-list.mock';

import { MealItemComponent } from './meal-item.component';

describe('MealItemComponent', () => {
  let component: MealItemComponent;
  let fixture: ComponentFixture<MealItemComponent>;

  describe('Unit tests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [MealItemComponent],
        imports: [MatListModule, SharedModule]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(MealItemComponent);
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
        declarations: [MealItemComponent],
        imports: [MatListModule, SharedModule]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(MealItemComponent);
      component = fixture.componentInstance;
      component.meal = mockMeal;
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

      const mealItemAvatar = fixture.debugElement.query(
        By.css('.avatar-container > img')
      ).nativeElement;

      expect(mealItemAvatar).toBeTruthy();
    });
  });
});
