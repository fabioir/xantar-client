import { TestBed } from '@angular/core/testing';
import { IIconButtonSettings } from '@xantar/domain/models';
import { Subject } from 'rxjs';
import { ToolbarService } from './toolbar.service';

describe('ToolbarService', () => {
  let service: ToolbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('title', () => {
    it('should have a default title', () => {
      service.title$.subscribe((defaultTitle) =>
        expect(defaultTitle).toBe('Xantar')
      );
    });

    it('should cast a new title when set', () => {
      const newTitle = 'new title';
      service.title = newTitle;

      service.title$.subscribe((title) => expect(title).toBe(newTitle));
    });

    it('should cast default title if set to a falsy value', () => {
      service.title = '';

      service.title$.subscribe((defaultTitle) =>
        expect(defaultTitle).toBe('Xantar')
      );
    });
  });

  describe('addButtonSettings', () => {
    it('should be null by default', () => {
      service.addButtonSettings$.subscribe((defaultSettings) => {
        expect(defaultSettings).toBeNull();
      });
    });

    it('should cast the set button settings', () => {
      const newSettings: IIconButtonSettings = {
        tooltip: 'test tooltip',
        clickSubject: new Subject<boolean>()
      };
      service.addButtonSettings = newSettings;

      service.addButtonSettings$.subscribe((settings) =>
        expect(settings).toEqual(newSettings)
      );
    });
  });
});
