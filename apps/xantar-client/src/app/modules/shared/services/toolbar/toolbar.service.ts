import { Injectable } from '@angular/core';
import { IIconButtonSettings } from '@xantar/domain/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private titleSubject = new BehaviorSubject<string>('Xantar');
  private addButtonSettingsSubject = new BehaviorSubject<
    IIconButtonSettings | unknown
  >(null as unknown as IIconButtonSettings);

  get title$(): Observable<string> {
    return this.titleSubject.asObservable();
  }

  get addButtonSettings$(): Observable<IIconButtonSettings | unknown> {
    return this.addButtonSettingsSubject.asObservable();
  }

  set title(title: string) {
    this.titleSubject.next(title || 'Xantar');
  }

  set addButtonSettings(settings: IIconButtonSettings | unknown) {
    this.addButtonSettingsSubject.next(settings);
  }
}
