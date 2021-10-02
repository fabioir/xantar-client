import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Endpoint } from '@xantar/domain/models';
import { of } from 'rxjs';
import { ApiService } from '../../../../services/api/api.service';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CreateMealDialogComponent } from '../../components/create-meal-dialog/create-meal-dialog.component';
import { mockMeal } from '../../components/meals-list/meals-list.mock';
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

  describe('createMeal', () => {
    it('should open a create meal dialog', () => {
      const createMealSpy = jest
        .spyOn(service, 'createMeal')
        .mockImplementation(() => of(mockMeal));
      const openDialogSpy = jest
        .spyOn(service['dialog'], 'open')
        .mockImplementation(() => {
          return {
            afterClosed: () => of(mockMeal)
          } as unknown as MatDialogRef<CreateMealDialogComponent>;
        });

      service.addNewMeal();

      expect(openDialogSpy).toHaveBeenCalledWith(CreateMealDialogComponent, {
        panelClass: 'create-meal-dialog',
        ariaLabel: 'meals.create.add_meal',
        minWidth: '55%'
      });
      expect(createMealSpy).toHaveBeenCalledWith(mockMeal);

      createMealSpy.mockRestore();
      openDialogSpy.mockRestore();
    });
    it('should create a new meal', (done) => {
      const mockMealEndpoint = {
        getUrlForMethod: () => '/api/meals'
      };

      const createtEndpointSpy = jest
        .spyOn(service['api'], 'getEndpoint')
        .mockReturnValueOnce(mockMealEndpoint as unknown as Endpoint);

      service.createMeal(mockMeal).subscribe((meal) => {
        expect(meal).toEqual(mockMeal);
        done();
      });

      httpTestingController
        .expectOne(
          (req) =>
            req.url === '/api/meals' &&
            req.method === 'POST' &&
            req.body === mockMeal
        )
        .flush(mockMeal);
      createtEndpointSpy.mockClear();
    });
  });

  describe('Delete Meal', () => {
    describe('deleteMealWithDialog', () => {
      it('should open a dialog and delete a meal on confirmation', (done) => {
        const deleteMealSpy = jest
          .spyOn(service, 'deleteMeal')
          .mockImplementation(() => of(true));
        const openDialogSpy = jest
          .spyOn(service['dialog'], 'open')
          .mockImplementation(() => {
            return {
              afterClosed: () => of(true)
            } as unknown as MatDialogRef<ConfirmationDialogComponent>;
          });

        service.deleteMealWithDialog(mockMeal).subscribe((deleted) => {
          expect(deleted).toBe(true);

          expect(openDialogSpy).toHaveBeenCalledWith(
            ConfirmationDialogComponent,
            {
              panelClass: 'delete-meal-dialog',
              ariaLabel: 'meals.delete.dialog_label',
              data: {
                title: 'meals.delete.confirmation.title',
                caption: 'meals.delete.confirmation.caption',
                cancel: 'meals.delete.confirmation.cancel',
                confirm: 'meals.delete.confirmation.confirm'
              }
            }
          );
          expect(deleteMealSpy).toHaveBeenCalledWith(mockMeal);

          done();
        });

        deleteMealSpy.mockRestore();
        openDialogSpy.mockRestore();
      });

      it('should open a dialog and return false on cancel', (done) => {
        const deleteMealSpy = jest.spyOn(service, 'deleteMeal');
        const openDialogSpy = jest
          .spyOn(service['dialog'], 'open')
          .mockImplementation(() => {
            return {
              afterClosed: () => of(false)
            } as unknown as MatDialogRef<ConfirmationDialogComponent>;
          });

        service.deleteMealWithDialog(mockMeal).subscribe((deleted) => {
          expect(deleted).toBe(false);

          expect(openDialogSpy).toHaveBeenCalledWith(
            ConfirmationDialogComponent,
            {
              panelClass: 'delete-meal-dialog',
              ariaLabel: 'meals.delete.dialog_label',
              data: {
                title: 'meals.delete.confirmation.title',
                caption: 'meals.delete.confirmation.caption',
                cancel: 'meals.delete.confirmation.cancel',
                confirm: 'meals.delete.confirmation.confirm'
              }
            }
          );
          expect(deleteMealSpy).not.toHaveBeenCalled();

          done();
        });

        deleteMealSpy.mockRestore();
        openDialogSpy.mockRestore();
      });
    });

    describe('deleteMeal', () => {
      let mockMealEndpoint;
      let deleteEndpointSpy: jest.SpyInstance;
      beforeEach(() => {
        mockMealEndpoint = {
          getUrlForMethod: () => `/api/meals/${mockMeal.id}`
        };
        deleteEndpointSpy = jest
          .spyOn(service['api'], 'getEndpoint')
          .mockReturnValueOnce(mockMealEndpoint as unknown as Endpoint);
      });

      afterEach(() => deleteEndpointSpy.mockClear());

      it('should make a request to delete a meal', (done) => {
        service.deleteMeal(mockMeal).subscribe((confirmation) => {
          expect(confirmation).toBe(true);
          done();
        });

        httpTestingController
          .expectOne(
            (req) =>
              req.url === `/api/meals/${mockMeal.id}` && req.method === 'DELETE'
          )
          .flush({});
      });

      it('should make a request to delete a meal and return false on error', (done) => {
        const consoleErrorSpy = jest
          .spyOn(window.console, 'error')
          .mockImplementation(jest.fn);

        service.deleteMeal(mockMeal).subscribe((confirmation) => {
          expect(confirmation).toBe(false);
          expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Error trying to delete a meal:\nHttp failure response for /api/meals/a64e27e3-974f-4b3b-a416-fb0cc7761c18: 404 '
          );
          done();
        });

        httpTestingController
          .expectOne(
            (req) =>
              req.url === `/api/meals/${mockMeal.id}` && req.method === 'DELETE'
          )
          .error(
            new ErrorEvent(`Meal with id ${mockMeal.id} could not be deleted.`),
            { status: 404 }
          );

        consoleErrorSpy.mockClear();
      });
    });
  });

  describe('Edit Meal', () => {
    it('should open a create meal dialog to edit the meal', (done) => {
      const editedMeal = { ...mockMeal, name: 'edited name' };
      const editMealSpy = jest
        .spyOn(service, 'editMeal')
        .mockImplementation(() => of(editedMeal));
      const openDialogSpy = jest
        .spyOn(service['dialog'], 'open')
        .mockImplementation(() => {
          return {
            afterClosed: () => of(editedMeal)
          } as unknown as MatDialogRef<CreateMealDialogComponent>;
        });

      service.editMealWithDialog(mockMeal).subscribe(() => {
        expect(editMealSpy).toHaveBeenCalledWith(editedMeal, mockMeal.id);
        expect(openDialogSpy).toHaveBeenCalledWith(CreateMealDialogComponent, {
          panelClass: 'create-meal-dialog',
          ariaLabel: 'meals.create.add_meal',
          minWidth: '55%',
          data: mockMeal
        });
        editMealSpy.mockRestore();
        openDialogSpy.mockRestore();
        done();
      });
    });

    it('should open a create meal dialog to edit the meal and return null if unchanged', (done) => {
      const editMealSpy = jest
        .spyOn(service, 'editMeal')
        .mockImplementation(() => of(mockMeal));
      const openDialogSpy = jest
        .spyOn(service['dialog'], 'open')
        .mockImplementation(() => {
          return {
            afterClosed: () => of(mockMeal)
          } as unknown as MatDialogRef<CreateMealDialogComponent>;
        });

      service.editMealWithDialog(mockMeal).subscribe((res) => {
        expect(res).toBeNull();
        expect(editMealSpy).not.toHaveBeenCalled();
        expect(openDialogSpy).toHaveBeenCalledWith(CreateMealDialogComponent, {
          panelClass: 'create-meal-dialog',
          ariaLabel: 'meals.create.add_meal',
          minWidth: '55%',
          data: mockMeal
        });
        editMealSpy.mockRestore();
        openDialogSpy.mockRestore();
        done();
      });
    });

    it('should open a create meal dialog to edit the meal and return null if cancelled', (done) => {
      const editMealSpy = jest
        .spyOn(service, 'editMeal')
        .mockImplementation(() => of(mockMeal));
      const openDialogSpy = jest
        .spyOn(service['dialog'], 'open')
        .mockImplementation(() => {
          return {
            afterClosed: () => of(null)
          } as unknown as MatDialogRef<CreateMealDialogComponent>;
        });

      service.editMealWithDialog(mockMeal).subscribe((res) => {
        expect(res).toBeNull();
        expect(editMealSpy).not.toHaveBeenCalled();
        expect(openDialogSpy).toHaveBeenCalledWith(CreateMealDialogComponent, {
          panelClass: 'create-meal-dialog',
          ariaLabel: 'meals.create.add_meal',
          minWidth: '55%',
          data: mockMeal
        });
        editMealSpy.mockRestore();
        openDialogSpy.mockRestore();
        done();
      });
    });

    describe('editMeal', () => {
      let mockMealEndpoint;
      let editEndpointSpy: jest.SpyInstance;
      beforeEach(() => {
        mockMealEndpoint = {
          getUrlForMethod: () => `/api/meals/${mockMeal.id}`
        };
        editEndpointSpy = jest
          .spyOn(service['api'], 'getEndpoint')
          .mockReturnValueOnce(mockMealEndpoint as unknown as Endpoint);
      });

      afterEach(() => editEndpointSpy.mockClear());

      it('should patch a meal', (done) => {
        const editedMeal = { ...mockMeal, name: 'edited name' };

        service.editMeal(editedMeal, mockMeal.id).subscribe((response) => {
          expect(response).toBe(editedMeal);
          done();
        });

        httpTestingController
          .expectOne(
            (req) =>
              req.url === `/api/meals/${mockMeal.id}` && req.method === 'PATCH'
          )
          .flush(editedMeal);
      });

      it('should handle an error when patching a meal', (done) => {
        const editedMeal = { ...mockMeal, name: 'edited name' };
        const consoleErrorSpy = jest
          .spyOn(window.console, 'error')
          .mockImplementation(jest.fn);

        service.editMeal(editedMeal, mockMeal.id).subscribe((response) => {
          expect(response).toBe(null);
          expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Error trying to edit a meal:\nHttp failure response for /api/meals/a64e27e3-974f-4b3b-a416-fb0cc7761c18: 404 '
          );
          done();
        });

        httpTestingController
          .expectOne(
            (req) =>
              req.url === `/api/meals/${mockMeal.id}` && req.method === 'PATCH'
          )
          .error(
            new ErrorEvent(`Meal with id ${mockMeal.id} could not be edited.`),
            { status: 404 }
          );

        consoleErrorSpy.mockClear();
      });
    });
  });
});
