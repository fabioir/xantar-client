import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '../../../../services/api/api.service';
import { mockSchedule } from '../../mocks/schedule.mock';
import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
  let service: ScheduleService;
  let httpTestingController: HttpTestingController;

  const mockGetEndpoint = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: { getEndpoint: mockGetEndpoint } }
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ScheduleService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request schedule generation', (done) => {
    const mockSchedulesEndpoint = {
      getUrlForMethod: () => '/api/schedules'
    };

    mockGetEndpoint.mockReturnValue(mockSchedulesEndpoint);

    service.generateSchedule().subscribe((schedule) => {
      expect(schedule).toEqual(mockSchedule);
      done();
    });

    httpTestingController
      .expectOne((req) => req.url === '/api/schedules')
      .flush(mockSchedule);
    mockGetEndpoint.mockRestore();
  });
});
