import { Component, OnInit, Input } from '@angular/core';
import { ParsedJsonString } from 'src/app/Models/ParsedJsonString';

@Component({
  selector: 'app-message-json-tree-container',
  templateUrl: './message-json-tree-container.component.html',
  styleUrls: ['./message-json-tree-container.component.scss']
})
export class MessageJsonTreeContainerComponent implements OnInit {

  constructor() { }

  @Input() public parsedValue: ParsedJsonString;

  ngOnInit() {
  }

}
