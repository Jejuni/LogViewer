import { Directive, HostListener } from '@angular/core';
import { LogEntryTableDatasourceService } from 'src/app/Services/log-entry-table-datasource.service';

@Directive({
  selector: '[appReloadButton]'
})
export class ReloadButtonDirective {

  constructor(private dataSourceSvc: LogEntryTableDatasourceService) { }

  @HostListener('click', ['$event']) onclick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.dataSourceSvc.refreshCurrentResults();
  }
}
