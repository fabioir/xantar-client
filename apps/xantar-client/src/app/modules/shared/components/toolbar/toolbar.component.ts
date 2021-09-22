import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { IIconButtonSettings } from '@xantar/domain/models';
import { Subscription } from 'rxjs';
import { ToolbarService } from '../../services/toolbar/toolbar.service';

@Component({
  selector: 'xantar-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  public title = 'Xantar';
  public addButtonSettings!: IIconButtonSettings;

  constructor(
    private toolbarService: ToolbarService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.toolbarService.title$.subscribe((title) => {
        this.title = title;
        this.cd.markForCheck();
      })
    );
    this.subscriptions.add(
      this.toolbarService.addButtonSettings$.subscribe((addButtonSettings) => {
        this.addButtonSettings = addButtonSettings as IIconButtonSettings;
        this.cd.markForCheck();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
