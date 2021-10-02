import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITile } from '@xantar/domain/models';

@Component({
  selector: 'xantar-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  @Input() tile!: ITile;
}
