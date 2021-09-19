import {
  Endpoint,
  HttpMethodEnum,
  IXantarEnvironment
} from '@xantar/domain/models';
import { MealsEndpoint } from './endpoints.relation';

describe('Endpoints relation', () => {
  const mockEnvironment: IXantarEnvironment = {
    baseHref: 'testingXantarEndpointRelation',
    production: false
  };

  describe('Endpoint Extension', () => {
    class DummyClass extends Endpoint {
      constructor() {
        super(
          'xantar/api/dummy',
          [HttpMethodEnum.CONNECT],
          ['size', 'pageCount']
        );
      }

      getUrlForMethod(method: HttpMethodEnum): string {
        return method + '';
      }
    }

    it('should create', () => {
      const endpoint = new DummyClass();
      expect(endpoint).toBeTruthy();
    });

    it('should return url, methods and queryParams', () => {
      const endpoint = new DummyClass();
      expect(endpoint.getUrl()).toBe('xantar/api/dummy');

      const methods: HttpMethodEnum[] = endpoint.getMethods();
      expect(Array.isArray(methods)).toBe(true);
      expect(methods[0]).toBe(HttpMethodEnum.CONNECT);

      const queryParams: string[] = endpoint.getQueryParams();
      expect(Array.isArray(queryParams)).toBe(true);
      expect(queryParams[0]).toBe('size');
      expect(queryParams[1]).toBe('pageCount');
    });
  });
  describe('MealsEndpoint', () => {
    let meals: MealsEndpoint;

    beforeEach(() => {
      meals = new MealsEndpoint(mockEnvironment);
    });

    it('should have methods', () => {
      const mealsMethods = meals.getMethods();

      expect(mealsMethods.length).toBe(1);
      expect(mealsMethods[0]).toBe(HttpMethodEnum.GET);
    });

    it('should have url', () => {
      const mealsUrl = meals.getUrl();

      expect(mealsUrl).toBe(`${mockEnvironment.baseHref}/meals`);
    });

    it('should have no query parameters', () => {
      const mealsQueryParameters = meals.getQueryParams();

      expect(mealsQueryParameters.length).toBe(0);
    });

    it('should return url for Get method', () => {
      const urlForGet = meals.getUrlForMethod(HttpMethodEnum.GET);

      expect(urlForGet).toBe(`${mockEnvironment.baseHref}/meals`);
    });

    it('should return null for != Get method', () => {
      let urlForGet = null;
      for (const method in HttpMethodEnum) {
        if (method !== HttpMethodEnum.GET + '') {
          urlForGet = meals.getUrlForMethod(
            method as unknown as HttpMethodEnum
          );
        }
        expect(urlForGet).toBeNull();
      }
    });
  });
});
