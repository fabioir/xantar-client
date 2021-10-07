import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../../shared/shared.module';
import { mockMeal } from '../meals-list/meals-list.mock';
import { MealItemComponent } from './meal-item.component';

const materialModules = [MatListModule, MatTooltipModule, MatIconModule];

describe('MealItemComponent', () => {
  let component: MealItemComponent;
  let fixture: ComponentFixture<MealItemComponent>;
  let rootLoader: HarnessLoader;

  describe('Unit tests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [MealItemComponent],
        imports: [SharedModule, ...materialModules],
        providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }]
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
        imports: [SharedModule, ...materialModules],
        providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(MealItemComponent);
      component = fixture.componentInstance;
      component.meal = mockMeal;
      fixture.detectChanges();
      rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
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

    it('should show delete button on mousenter', async () => {
      const mealItemContainer = fixture.debugElement.query(
        By.css('.meal-item-container')
      );
      mealItemContainer.triggerEventHandler('mouseenter', {});

      const matButtonHarness = await rootLoader.getHarness(
        MatButtonHarness.with({ selector: '.delete-button' })
      );
      expect(matButtonHarness).toBeTruthy();
      expect(await matButtonHarness.getText()).toBe('delete');
    });

    it('should trigger delete event', async () => {
      const deleteMealEmitterSpy = jest.spyOn(component.deleteMeal, 'emit');
      const mealItemContainer = fixture.debugElement.query(
        By.css('.meal-item-container')
      );
      mealItemContainer.triggerEventHandler('mouseenter', {});

      const matButtonHarness = await rootLoader.getHarness(
        MatButtonHarness.with({ selector: '.delete-button' })
      );
      expect(matButtonHarness).toBeTruthy();

      expect(deleteMealEmitterSpy).not.toHaveBeenCalled();
      await matButtonHarness.click();
      expect(deleteMealEmitterSpy).toHaveBeenCalledWith(mockMeal);

      deleteMealEmitterSpy.mockClear();
    });

    it('should show edit button on mousenter', async () => {
      const mealItemContainer = fixture.debugElement.query(
        By.css('.meal-item-container')
      );
      mealItemContainer.triggerEventHandler('mouseenter', {});

      const matButtonHarness = await rootLoader.getHarness(
        MatButtonHarness.with({ selector: '.edit-button' })
      );
      expect(matButtonHarness).toBeTruthy();
      expect(await matButtonHarness.getText()).toBe('edit');
    });

    it('should trigger edit event', async () => {
      const editMealEmitterSpy = jest.spyOn(component.editMeal, 'emit');
      const mealItemContainer = fixture.debugElement.query(
        By.css('.meal-item-container')
      );
      mealItemContainer.triggerEventHandler('mouseenter', {});

      const matButtonHarness = await rootLoader.getHarness(
        MatButtonHarness.with({ selector: '.edit-button' })
      );
      expect(matButtonHarness).toBeTruthy();

      expect(editMealEmitterSpy).not.toHaveBeenCalled();
      await matButtonHarness.click();
      expect(editMealEmitterSpy).toHaveBeenCalledWith(mockMeal);

      editMealEmitterSpy.mockClear();
    });
  });
});
