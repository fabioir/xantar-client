import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { slotsList } from '@xantar/domain/models';
import { mockMeal } from '../../../meals/components/meals-list/meals-list.mock';
import { SharedModule } from '../../../shared/shared.module';
import { mockTile } from '../../mocks/schedule.mock';
import { TileComponent } from './tile.component';

describe('TileComponent', () => {
  let component: TileComponent;
  let fixture: ComponentFixture<TileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TileComponent],
      imports: [SharedModule],
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Integration tests', () => {
    beforeEach(() => {
      component.tile = mockTile;
      fixture.detectChanges();
    });
    it('should show title', () => {
      const title = fixture.debugElement.query(By.css('.title-container'));
      expect(title).toBeTruthy();
      expect(title.nativeElement.textContent).toBe(mockMeal.name);
    });

    it('should show image', () => {
      const img = fixture.debugElement.query(By.css('img'));
      expect(img).toBeTruthy();
    });

    it('should show description on hover', () => {
      const container = fixture.debugElement.query(By.css('.tile-container'));
      container.triggerEventHandler('mouseenter', {});

      fixture.detectChanges();
      const description = fixture.debugElement.query(
        By.css('.description-container')
      );
      expect(description).toBeTruthy();
      expect(description.nativeElement.textContent).toContain(
        mockMeal.description
      );
    });

    it('should show description if no image is available', () => {
      fixture = TestBed.createComponent(TileComponent);
      component = fixture.componentInstance;
      component.tile = {
        ...mockTile,
        config: {
          slot: slotsList.breakfast,
          meal: { ...mockMeal, imageThumb: null as unknown as string }
        }
      };

      fixture.detectChanges();
      const description = fixture.debugElement.query(
        By.css('.description-container')
      );
      expect(description).toBeTruthy();
      expect(description.nativeElement.textContent).toContain(
        mockMeal.description
      );
    });
  });
});
