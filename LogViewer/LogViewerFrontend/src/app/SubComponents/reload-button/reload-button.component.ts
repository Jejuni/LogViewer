import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LogEntryTableDatasourceService } from 'src/app/Services/log-entry-table-datasource.service';
import { MatButton } from '@angular/material';

@Component({
  selector: 'app-reload-button',
  templateUrl: './reload-button.component.html',
  styleUrls: ['./reload-button.component.scss']
})
export class ReloadButtonComponent implements OnInit {

  constructor(public dataSourceSvc: LogEntryTableDatasourceService) { }

  ngOnInit() {
  }
}
