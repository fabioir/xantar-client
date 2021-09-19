import { NgModule } from '@angular/core';
import { B64ImgPipe } from './pipes/b64Img/b64Img.pipe';
import { ReloadContentComponent } from './components/reload-content/reload-content.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const materialModules = [MatButtonModule, MatIconModule, MatTooltipModule];

@NgModule({
  declarations: [B64ImgPipe, ReloadContentComponent],
  imports: materialModules,
  exports: [B64ImgPipe, ReloadContentComponent]
})
export class SharedModule {}
