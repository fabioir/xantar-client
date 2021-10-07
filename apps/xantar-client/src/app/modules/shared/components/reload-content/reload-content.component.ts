import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'xantar-reload-content',
  templateUrl: './reload-content.component.html',
  styleUrls: ['./reload-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReloadContentComponent {
  @Input() message!: string;
  @Input() tooltip = 'Click to reload';
  @Input() icon = 'refresh';

  @Output() reload = new EventEmitter();
}
