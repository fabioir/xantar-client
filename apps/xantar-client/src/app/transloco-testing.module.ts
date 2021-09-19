import {
  TranslocoTestingModule,
  TranslocoTestingOptions
} from '@ngneat/transloco';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: {},
    translocoConfig: {
      availableLangs: ['en', 'es'],
      defaultLang: 'en'
    },
    preloadLangs: true,
    ...options
  });
}
