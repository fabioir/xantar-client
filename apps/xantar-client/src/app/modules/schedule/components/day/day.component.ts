import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { IDay, ITile } from '@xantar/domain/models';

@Component({
  selector: 'xantar-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayComponent implements OnChanges {
  @Input() day!: IDay;

  public tiles!: ITile[];

  ngOnChanges(): void {
    this.tiles = this._buildTiles(this.day);
  }

  private _buildTiles(day: IDay): ITile[] {
    return day.config.map((conf, _i, confArray) => {
      return { config: conf, cols: 1, rows: Math.floor(5 / confArray.length) };
    });
  }
}
