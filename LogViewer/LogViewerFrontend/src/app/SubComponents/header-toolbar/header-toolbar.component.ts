import { Component, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/Services/display.service';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss']
})
export class HeaderToolbarComponent implements OnInit {

  constructor(
    public displayService: DisplayService
    ) { }

  ngOnInit() {
  }
}
