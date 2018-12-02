import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StringJsonParserService } from 'src/app/Services/string-json-parser.service';
import { ParsedJsonString } from 'src/app/Models/ParsedJsonString';

@Component({
  selector: 'app-log-message-display',
  templateUrl: './log-message-display.component.html',
  styleUrls: ['./log-message-display.component.scss']
})
export class LogMessageDisplayComponent implements OnInit {

  constructor(public msgParserSvc: StringJsonParserService) { }

  @Input() public messageString: string;
  @Output() public displayJsonClicked = new EventEmitter<string[]>();

  public parsedValue: ParsedJsonString;

  ngOnInit() {
    this.parsedValue = this.msgParserSvc.parseString(this.messageString);
  }
}
