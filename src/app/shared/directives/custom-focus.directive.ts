import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[customFocus]',
  standalone: true,
})
export class CustomFocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }
}
