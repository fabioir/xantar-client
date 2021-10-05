import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatGridListHarness } from '@angular/material/grid-list/testing';
import { ITile, slotsList } from '@xantar/domain/models';
import { SharedModule } from '../../../shared/shared.module';
import { mockDay, mockDayConfig } from '../../mocks/schedule.mock';
import { tilesPalette } from '../../utils/color.utils';
import { TileComponent } from '../tile/tile.component';
import { DayComponent } from './day.component';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;
  let rootLoader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayComponent, TileComponent],
      imports: [MatGridListModule, SharedModule],
      providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    it('should calculate tiles on changes', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const buildTilesSpy = jest.spyOn<any, any>(component, '_buildTiles');

      fixture.detectChanges();
      expect(buildTilesSpy).not.toHaveBeenCalled();
      expect(component.tiles).toBeUndefined();

      component.day = mockDay;
      component.ngOnChanges();
      expect(buildTilesSpy).toHaveBeenCalledWith(mockDay);
    });

    describe('_buildTiles', () => {
      it('should return an array of ITile', () => {
        fixture.detectChanges();
        const tiles: ITile[] = component['_buildTiles'](mockDay);
        expect(tiles).toBeTruthy();
        expect(tiles.length).toBe(mockDay.configurations.length);
        const deviatingTile: boolean = tiles.some((tile: ITile) => {
          if (!tile.config) {
            return true;
          }
          if (tile.cols !== 1 || tile.rows !== 1) {
            return true;
          }
          if (!tilesPalette.includes(tile.color as string)) {
            return true;
          }
          return false;
        });

        expect(deviatingTile).toBe(false);
      });

      it('should aproximate the height of the tile', () => {
        fixture.detectChanges();
        const mock2MealsDay = {
          ...mockDay,
          configurations: [
            { ...mockDayConfig, slot: slotsList.breakfast },
            { ...mockDayConfig, slot: slotsList.snack1 }
          ]
        };

        const tiles: ITile[] = component['_buildTiles'](mock2MealsDay);
        expect(tiles).toBeTruthy();
        expect(tiles.length).toBe(2);
        expect(tiles[0].rows).toBe(2);
        expect(tiles[1].rows).toBe(2);
      });
    });
  });

  describe('Integration tests', () => {
    beforeEach(() => {
      component.day = mockDay;
      component.ngOnChanges();
      fixture.detectChanges();
    });

    it('should show tiles', async () => {
      const tilesList = await rootLoader.getHarness(MatGridListHarness);
      expect(tilesList).toBeTruthy();

      const columnsNumber = await tilesList.getColumns();
      expect(columnsNumber).toBe(1);

      const tiles = await tilesList.getTiles();
      expect(tiles.length).toBe(5);

      const someTileRowSpan = await tiles[0].getRowspan();
      expect(someTileRowSpan).toBe(1);
    });
  });
});
