import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { IDay, ITile } from '@xantar/domain/models';
import { getColors } from '../../utils/color.utils';

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
    const colors = getColors(day?.config?.length || 5);
    return day.config.map((conf, index, confArray) => {
      return {
        config: conf,
        cols: 1,
        rows: Math.floor(5 / confArray.length),
        color: colors[index]
      };
    });
  }
}
