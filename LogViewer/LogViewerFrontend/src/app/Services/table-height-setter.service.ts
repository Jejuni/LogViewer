import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableHeightSetterService {

  constructor() { }

  isInfiniteTableSet = true;

  changeDisplaySetting() {
    this.isInfiniteTableSet = !this.isInfiniteTableSet;
  }
}
