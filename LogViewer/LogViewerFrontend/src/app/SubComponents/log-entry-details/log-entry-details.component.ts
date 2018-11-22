import { Component, OnInit, Input } from '@angular/core';
import { LogEntry } from '../../Models/LogEntry';

@Component({
  selector: 'app-log-entry-details',
  templateUrl: './log-entry-details.component.html',
  styleUrls: ['./log-entry-details.component.scss']
})
export class LogEntryDetailsComponent implements OnInit {

  constructor() { }

  @Input() logEntry: LogEntry;

  ngOnInit() {
  }

}
