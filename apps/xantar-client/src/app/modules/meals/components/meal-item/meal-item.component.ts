import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IMealSumup } from '@xantar/domain/models';

@Component({
  selector: 'xantar-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealItemComponent implements OnChanges {
  public imageUrl!: SafeUrl;

  @Input() meal!: IMealSumup;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    //TODO: Make a pipe to manage this logic in the template
    this.imageUrl = this.sanitizer
      .bypassSecurityTrustUrl(`data:image/jpeg;base64,
    ${this.meal.imageThumb}`);
  }
}
