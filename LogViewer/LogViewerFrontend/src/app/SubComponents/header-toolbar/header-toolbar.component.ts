import { Component, OnInit } from '@angular/core';
import { TableHeightSetterService } from 'src/app/Services/table-height-setter.service';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss']
})
export class HeaderToolbarComponent implements OnInit {

  constructor(public tableDisplayService: TableHeightSetterService) { }

  ngOnInit() {
  }

}
