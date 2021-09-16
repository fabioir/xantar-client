import { NgModule } from '@angular/core';
import { B64ImgPipe } from './pipes/b64Img/b64Img.pipe';

@NgModule({
  declarations: [B64ImgPipe],
  exports: [B64ImgPipe]
})
export class SharedModule {}
