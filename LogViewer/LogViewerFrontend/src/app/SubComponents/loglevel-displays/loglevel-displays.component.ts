import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogEntryTableDatasourceService } from 'src/app/Services/log-entry-table-datasource.service';
import { LogLevelStyleRetrieverService } from 'src/app/Services/log-level-style-retriever.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-loglevel-displays',
  templateUrl: './loglevel-displays.component.html',
  styleUrls: ['./loglevel-displays.component.scss']
})
export class LoglevelDisplaysComponent implements OnInit, OnDestroy {

  constructor(
    public logStyleRetriever: LogLevelStyleRetrieverService,
    public logDataSource: LogEntryTableDatasourceService
  ) { }

  private subscription: Subscription;
  public logStats;

  ngOnInit() {
    this.subscription = this.logDataSource.connect().subscribe(data => {
      const initialValue = {};
      this.logStyleRetriever.allLogLevels.forEach(val => {
        initialValue[val] = {
          amount: 0,
          exceptions: 0
        };
      });

      this.logStats = data.reduce((acc, curr) => {
        acc[curr.logLevel].amount++;
        if (!!curr.exception) {
          acc[curr.logLevel].exceptions++;
        }
        return acc;
      }, initialValue);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
