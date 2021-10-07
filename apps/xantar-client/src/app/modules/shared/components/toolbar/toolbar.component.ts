import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IIconButtonSettings } from '@xantar/domain/models';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
  public showScheduleLink = true;
  public showListLink = true;

  constructor(
    private toolbarService: ToolbarService,
    private cd: ChangeDetectorRef,
    private router: Router
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
    this.subscriptions.add(this._subscribeToRoute(this.router.events));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private _subscribeToRoute(routerEvents: Observable<unknown>): Subscription {
    return routerEvents
      .pipe(
        filter((event: unknown) => event instanceof NavigationEnd),
        map((event: unknown) => (event as NavigationEnd).url)
      )
      .subscribe((url: string) => {
        if (url === '/meals') {
          this.showListLink = false;
          this.showScheduleLink = true;
        } else if (url === '/schedule') {
          this.showListLink = true;
          this.showScheduleLink = false;
        }
        this.cd.markForCheck();
      });
  }
}
