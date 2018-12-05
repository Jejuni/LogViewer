import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { LogEntryTableDatasourceService } from 'src/app/Services/log-entry-table-datasource.service';
import { LogEntry } from 'src/app/Models/LogEntry';
import { LogLevelStyleRetrieverService } from 'src/app/Services/log-level-style-retriever.service';
import { MatPaginator, MatSort } from '@angular/material';
import { DisplayService } from 'src/app/Services/display.service';
import { ParsedJsonString } from 'src/app/Models/ParsedJsonString';

@Component({
  selector: 'app-log-entry-table',
  templateUrl: './log-entry-table.component.html',
  styleUrls: ['./log-entry-table.component.scss'],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
  //     state('expanded', style({ height: '*' })),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ]
  animations: [
    trigger('hideShowDetailsContainer', [
      transition(':enter', [
        style({height: 0, marginTop: 0}),
        animate('225ms ease-in-out', style({height: '*', marginTop: '*'}))
      ]),
      transition(':leave', [
        animate('225ms ease-in-out', style({height: 0, marginTop: 0}))
      ])
    ])
  ]
})
export class LogEntryTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dataSource: LogEntryTableDatasourceService,
    public logStyleRetriever: LogLevelStyleRetrieverService,
    public tableDisplayService: DisplayService
    ) {
    this.columnsToDisplay = [
      'id',
      'applicationName',
      'entryTime',
      'logLevel',
      'message'
    ];

    this.detailColumnToDisplay = [
      'exception',
      'logger',
      'stacktrace'
    ];
  }

  public expandedRow: (LogEntry & ParsedJsonString) | null;
  public columnsToDisplay: string[];
  public detailColumnToDisplay: string[];

  ngOnInit() {
    this.dataSource.addSorterAndPager(this.paginator, this.sort);
  }

  /**
   * Handler for Clicking on rows to display/hide the extended details
   * @param row A reference to the clicked row
   */
  public onRowClicked(row: LogEntry & ParsedJsonString): void {
    if (this.expandedRow === row) {
      this.expandedRow = null;
      return;
    }
    this.expandedRow = row;
  }

  public trackById(index: number, item: LogEntry & ParsedJsonString): number {
    return item.id;
  }
}
