import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TimePart } from 'src/app/Models/timePart';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  @Output() timeChanged = new EventEmitter<TimePart>();

  constructor() { }
  public _hourValue = '00';
  public _minuteValue = '00';
  private _lastValue = new TimePart();
  get hourValue(): string {
    return this._hourValue;
  }
  @Input()
  set hourValue(value: string) {
    this._hourValue = this.padStringLeadingZero(value);
  }

  get minuteValue(): string {
    return this._minuteValue;
  }
  @Input()
  set minuteValue(value: string) {
    this._minuteValue = this.padStringLeadingZero(value);
  }

  ngOnInit() {
  }

  // evaluateInput(input: string, existingInput: string) {
  //   if (input === '-') {
  //     return false;
  //   }

  //   if (Number.isNaN(+input)) {
  //     return true;
  //   }

  //   const totalLength = input.length + (!!existingInput ? +existingInput.length : 0);
  //   if (totalLength > 2) {
  //     return false;
  //   }

  //   return true;
  // }

  inputChanged() {
    if (Number.isNaN(+this.hourValue) || +this.hourValue < 0 || +this.hourValue > 23) {
      this.hourValue = '00';
      this._lastValue.hourValue = 0;
      return;
    }
    if (Number.isNaN(+this.minuteValue) || +this.minuteValue < 0 || +this.minuteValue > 59) {
      this.minuteValue = '00';
      this._lastValue.minuteValue = 0;
      return;
    }

    if (this._lastValue.hourValue === +this.hourValue && this._lastValue.minuteValue === +this.minuteValue) {
      return;
    }

    this._hourValue = this.padStringLeadingZero(this._hourValue);
    this._minuteValue = this.padStringLeadingZero(this._minuteValue);

    this._lastValue.hourValue = +this.hourValue;
    this._lastValue.minuteValue = +this.minuteValue;

    this.timeChanged.emit(this._lastValue);
  }

  private padStringLeadingZero(str: string): string {
    let buffer = '';
    for (let i = 0; i < 2 - str.length; i++) {
      buffer += '0';
    }
    return buffer + str;
  }
}
