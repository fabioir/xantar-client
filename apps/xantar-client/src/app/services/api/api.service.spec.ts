import { TestBed } from '@angular/core/testing';
import { EndpointRelation } from '@xantar/domain/models';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize', () => {
    service.init();

    const serviceEndpoints: EndpointRelation = service['endpoints'];
    expect(serviceEndpoints).toBeTruthy();
    expect(
      Object.prototype.hasOwnProperty.call(serviceEndpoints, 'meals')
    ).toBe(true);
  });

  describe('getMealsList()', () => {
    it.todo('should return a list of meals');
  });
});
