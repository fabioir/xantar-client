import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { ReloadContentComponent } from './components/reload-content/reload-content.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { B64ImgPipe } from './pipes/b64Img/b64Img.pipe';

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatToolbarModule
];

@NgModule({
  declarations: [B64ImgPipe, ReloadContentComponent, ToolbarComponent],
  imports: [...materialModules, TranslocoModule, CommonModule],
  exports: [B64ImgPipe, ReloadContentComponent, ToolbarComponent]
})
export class SharedModule {}
