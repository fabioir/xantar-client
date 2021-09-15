import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'b64'
})
export class B64Pipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(base64: SafeUrl | unknown): SafeUrl {
    if (!base64) {
      return null as unknown as SafeUrl;
    }
    return this.sanitizer.bypassSecurityTrustUrl(
      `data:image/jpeg;base64, ${this.sanitizer.sanitize(
        SecurityContext.URL,
        base64 as SafeUrl
      )}`
    );
  }
}
