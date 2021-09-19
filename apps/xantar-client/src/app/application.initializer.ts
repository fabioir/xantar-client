import { EMPTY, Observable } from 'rxjs';
import { ApiService } from './services/api/api.service';

export function initializeApp(api: ApiService): () => Observable<unknown> {
  return () => {
    api.init();
    return EMPTY;
  };
}
