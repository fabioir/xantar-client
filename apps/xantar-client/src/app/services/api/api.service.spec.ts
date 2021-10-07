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

  describe('getEndpoint()', () => {
    beforeEach(() => {
      service.init();
    });

    it('should return null if the endpoint is not found', () => {
      expect(service.getEndpoint('Unexisting endpoint')).toBeNull();
    });

    it('should throw an error if endpoint name is not valid', () => {
      expect(() => service.getEndpoint(null as unknown as string)).toThrow();
      expect(() => service.getEndpoint(10 as unknown as string)).toThrow();
    });
  });
});
