import { getBrowserLang, TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { ApiService } from './services/api/api.service';

export function initializeApp(
  api: ApiService,
  transloco: TranslocoService
): () => Observable<unknown> {
  return () => {
    api.init();
    const lang = getTranslocoLanguage(
      transloco.getDefaultLang(),
      transloco.getAvailableLangs() as string[]
    );
    transloco.setActiveLang(lang);
    return transloco.load(lang);
  };
}

function getTranslocoLanguage(
  defaultLang: string,
  availableLangs: string[] | { id: string; label: string }[]
): string {
  const lang: string = getBrowserLang() || defaultLang;
  const availableLangsStrings: string[] = availableLangs.map(
    (avLang) => (avLang as unknown as { id: string })?.id ?? avLang
  );
  return availableLangsStrings.includes(lang) ? lang : defaultLang;
}
