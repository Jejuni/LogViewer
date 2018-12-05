import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StringJsonParserService } from 'src/app/Services/string-json-parser.service';
import { ParsedJsonString } from 'src/app/Models/ParsedJsonString';
import { JsonTokens } from 'src/app/Models/JsonTokens';

@Component({
  selector: 'app-log-message-display',
  templateUrl: './log-message-display.component.html',
  styleUrls: ['./log-message-display.component.scss']
})
export class LogMessageDisplayComponent implements OnInit {

  constructor(private tokens: JsonTokens) { }

  @Input() public parsedValue: ParsedJsonString;

  ngOnInit() {
  }

  public copyMessage(val: string): void {
    const jsonNumber = (+val.replace(`${this.tokens.jsonReplacementToken} #`, '')) - 1;
    if (!Number.isInteger(jsonNumber)) {
      console.error(`Given JSON object number could not be parsed into a number. Given value was: ${val}`);
      return;
    }
    if (jsonNumber > this.parsedValue.extractedJsonStrings.length - 1) {
      console.error(`Parsed Json number [${jsonNumber.toString(10)}] was bigger than the ` +
        `biggest index of the json object array [${this.parsedValue.extractedJsonStrings.length - 1}].`);
      return;
    }
    let json = this.parsedValue.extractedJsonStrings[jsonNumber];
    try {
      json = JSON.stringify(JSON.parse(json), null, 4);
    } catch (e) {
      console.warn(`Given JSON object could not be parsed into a JSON object. Using raw JSON string.`);
    }

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = json;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
