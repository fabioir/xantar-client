import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Endpoint } from '@xantar/domain/models';
import { ApiService } from '../../../../services/api/api.service';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { MealsService } from './meals.service';

describe('MealsService', () => {
  let service: MealsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, getTranslocoModule()],
      providers: [
        MealsService,
        { provide: ApiService, useValue: { getEndpoint: () => jest.fn() } },
        { provide: MATERIAL_SANITY_CHECKS, useValue: false }
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MealsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMealsList', () => {
    it('should request meals list', (done) => {
      const mockMeal = {
        getUrlForMethod: () => '/api/meals'
      };

      const mockMealsList = [mockMeal];

      const getEndpointSpy = jest
        .spyOn(service['api'], 'getEndpoint')
        .mockReturnValueOnce(mockMeal as unknown as Endpoint);

      service.getMealsList().subscribe((meals) => {
        expect(meals).toEqual(mockMealsList);
        done();
      });

      httpTestingController
        .expectOne((req) => req.url === '/api/meals')
        .flush(mockMealsList);
      getEndpointSpy.mockClear();
    });
  });
});
