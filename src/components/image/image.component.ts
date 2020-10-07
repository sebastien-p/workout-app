import { Component, Input, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html'
})
export class ImageComponent implements OnDestroy {
  src?: SafeUrl;

  @Input()
  set source(value: Blob | undefined) {
    this.cleanup();

    this.src =
      value &&
      this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(value));
  }

  constructor(private readonly sanitizer: DomSanitizer) {}

  ngOnDestroy(): void {
    this.cleanup();
  }

  cleanup(): void {
    if (this.src) {
      // tslint:disable-next-line: no-string-literal
      URL.revokeObjectURL(this.src['changingThisBreaksApplicationSecurity']);
    }
  }
}
