import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
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
  declarations: [
    B64ImgPipe,
    ReloadContentComponent,
    ToolbarComponent,
    ConfirmationDialogComponent
  ],
  imports: [...materialModules, TranslocoModule, CommonModule, RouterModule],
  exports: [B64ImgPipe, ReloadContentComponent, ToolbarComponent]
})
export class SharedModule {}
