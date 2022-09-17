import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[appUsPhoneLength]'
})
export class UsPhoneLengthDirective implements OnInit, OnChanges {
  @Input() value: string;
  constructor(public el: ElementRef) { }
  ngOnInit() {
    this.el.nativeElement.innerHTML = '0';
  }
  ngOnChanges() {
    if (this.value !== '') {
      this.el.nativeElement.innerHTML = this.value.replace(/-| /g, '').substring(0, 10).length;
    } else {
      this.el.nativeElement.innerHTML = '0';
    }
  }

}
