import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUsPhoneFormat]'
})
export class UsPhoneFormatDirective {

  constructor(public ngControl: NgControl) { }
  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any): void {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: any): void {
    this.onInputChange(event.target.value, true);
  }
  @HostListener('paste', ['$event']) blockPaste(event: any): void {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event: string, backspace: boolean): void {
    if (event) {
      let newVal = event.replace(/\D/g, '');
      // if (backspace && newVal.length <= 6) {
      //   newVal = newVal.substring(0, newVal.length - 1);
      // }
      if (newVal.length === 0) {
        newVal = '';
      } else if (newVal.length <= 3) {
        newVal = newVal.replace(/^(\d{0,3})/, '$1');
      } else if (newVal.length <= 6) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1 - $2');
      } else if (newVal.length <= 10) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1 - $2 - $3');
      } else {
        newVal = newVal.substring(0, 10);
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1 - $2 - $3');
      }
      if (this.ngControl && this.ngControl.valueAccessor) {
        this.ngControl.valueAccessor.writeValue(newVal);
      }
    }
  }
}
