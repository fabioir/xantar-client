import { NgModule } from '@angular/core';
import { B64Pipe } from './pipes/b64/b64.pipe';

@NgModule({
  declarations: [B64Pipe],
  exports: [B64Pipe]
})
export class SharedModule {}
