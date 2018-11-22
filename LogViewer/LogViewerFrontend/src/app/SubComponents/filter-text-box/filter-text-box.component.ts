import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter-text-box',
  templateUrl: './filter-text-box.component.html',
  styleUrls: ['./filter-text-box.component.scss']
})
export class FilterTextBoxComponent implements OnInit, OnDestroy {
  @Output() public filterChange = new EventEmitter<string>();
  private debouncer = new Subject<string>();
  constructor() { }

  ngOnInit() {
    this.debouncer.pipe(
       // wait 300ms after each keystroke before considering the term
       debounceTime(300),

       // ignore new term if same as previous
       distinctUntilChanged()
    ).subscribe(val => this.filterChange.emit(val));
  }

  ngOnDestroy() {
    this.debouncer.unsubscribe();
  }

  public applyFilter(term: string): void {
    this.debouncer.next(term);
  }
}
