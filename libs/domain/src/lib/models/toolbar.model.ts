import { Subject } from 'rxjs';

export interface IIconButtonSettings {
  tooltip: string;
  clickSubject: Subject<boolean>;
}
