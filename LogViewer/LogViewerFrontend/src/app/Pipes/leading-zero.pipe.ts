import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadingZero'
})
export class LeadingZeroPipe implements PipeTransform {

  transform(value: string | number): string {
    const strVal = value.toString();
    let buffer = '';
    for (let i = 0; i < 2 - strVal.length; i++) {
      buffer += '0';
    }
    return buffer + strVal;
  }

}
