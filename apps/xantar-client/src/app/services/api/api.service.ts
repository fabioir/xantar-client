import { Injectable } from '@angular/core';
import { Endpoint, EndpointRelation } from '@xantar/domain/models';
import { environment } from '../../../environments/environment';
import { MealsEndpoint, SchedulesEndpoint } from './endpoints.relation';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private endpoints: EndpointRelation = {};

  public init() {
    this.endpoints.meals = new MealsEndpoint(environment);
    this.endpoints.schedules = new SchedulesEndpoint(environment);
  }

  public getEndpoint(endpointName: string): Endpoint {
    if (!endpointName || typeof endpointName !== 'string') {
      throw new Error(
        `ApiService: Endpoint name (${endpointName}) is not valid`
      );
    }

    const endpoint = this.endpoints[endpointName];

    return endpoint ?? null;
  }
}
