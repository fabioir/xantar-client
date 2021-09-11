import { TestBed } from '@angular/core/testing';
import { ApiService } from '../../../../services/api/api.service';

import { MealsService } from './meals.service';

describe('MealsService', () => {
  let service: MealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MealsService,
        { provide: ApiService, useValue: { getMealsList: () => jest.fn() } }
      ]
    });
    service = TestBed.inject(MealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
