import { Injectable, Inject } from '@angular/core';
import { ParsedJsonString } from '../Models/ParsedJsonString';
import { JsonTokens } from '../Models/JsonTokens';
import { CleanedMessageString } from '../Models/CleanedMessageString';

@Injectable({
  providedIn: 'root'
})
export class StringJsonParserService {

  constructor(private tokens: JsonTokens) { }

  /**
   * Parses the given string, looking for pre-configured JSON-object identifiers. If found the identifiers and
   * the containing JSON are replaced by a placeholeder and the found JSON objects are returned
   * @param str The string to parse
   */
  public parseString(str: string): ParsedJsonString {
    const regEx = new RegExp(`${this.tokens.jsonStartToken}.*?${this.tokens.jsonEndToken}`, 'gi');
    if (!regEx.test(str)) {
      return {
        cleanedMessageStringArray: [{messageString: str, isReplacementToken: false}],
        extractedJsonStrings: []
      };
    }
    const parseResult = this.validateAndParseJson(str);
    if (!parseResult.isValid) {
      return {
        cleanedMessageStringArray: [{messageString: str, isReplacementToken: false}],
        extractedJsonStrings: []
      };
    }

    return {
      cleanedMessageStringArray: parseResult.splitMessageString,
      extractedJsonStrings: parseResult.jsonStrings
    };

    // const tokenRemovalRegEx = new RegExp(`${this.tokens.jsonStartToken}|${this.tokens.jsonEndToken}`, 'gi');
    // const extractedJsonStrings: string[] = [];
    // let match: RegExpExecArray | null;
    // do {
    //   match = regEx.exec(str);
    //   if (!!match && !!match[0]) {
    //     extractedJsonStrings.push(match[0].replace(tokenRemovalRegEx, ''));
    //   }
    // } while (!!match);

    // return {
    //   cleanedString: cleanedString,
    //   extractedJsonStrings: extractedJsonStrings
    // };
  }

  private validateAndParseJson(str: string) {
    let startIndex = 0;
    let endIndex = 0;
    let previousEndIndex = 0;
    let potentialJson = '';
    const startTokenLength = this.tokens.jsonStartToken.length;
    const endTokenLength = this.tokens.jsonEndToken.length;
    const validJsonStringArray: string[] = [];
    const splitMessageWithTokens: CleanedMessageString[] = [];

    startIndex = str.indexOf(this.tokens.jsonStartToken);
    endIndex = str.indexOf(this.tokens.jsonEndToken);

    let firstPass = true;
    do {
      if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
        console.error(`Incorrect JSON Parse token constellation found, stopping parsing. Given string was: ${str}`);
        return {
          isValid: false,
          jsonStrings: [],
          splitMessageString: []
        };
      }

      potentialJson = str.substring(startIndex + this.tokens.jsonStartToken.length, endIndex);
      if (!potentialJson || !(potentialJson = potentialJson.trim())) {
        console.error(`Empty JSON string found where a JSON object was expected, stopping parsing. Given string was: ${str} `);
        return {
          isValid: false,
          jsonStrings: [],
          splitMessageString: []
        };
      }

      if (potentialJson.length < 2 || potentialJson[0] !== '{' || potentialJson[potentialJson.length - 1] !== '}') {
        console.error(`Invalid JSON object found, stopping parsing. Given string was: ${str}`);
        return {
          isValid: false,
          jsonStrings: [],
          splitMessageString: []
        };
      }

      splitMessageWithTokens.push({
        isReplacementToken: false,
        messageString: str.substring(firstPass ? 0 : previousEndIndex + endTokenLength, startIndex).trim()
      });
      splitMessageWithTokens.push({
        isReplacementToken: true,
        messageString: this.tokens.jsonReplacementToken.trim()
      });

      validJsonStringArray.push(potentialJson);
      firstPass = false;
      previousEndIndex = endIndex;
    } while (this.hasNextPosition(str.length, endIndex + endTokenLength)
      && (startIndex = str.indexOf(this.tokens.jsonStartToken, startIndex + startTokenLength)) !== -1
      && (endIndex = str.indexOf(this.tokens.jsonEndToken, endIndex + endTokenLength)) !== -1);

      if (previousEndIndex < str.length - 1) {
        splitMessageWithTokens.push({
          isReplacementToken: false,
          messageString: str.substring(previousEndIndex + endTokenLength)
        });
      }

    return {
      isValid: true,
      jsonStrings: validJsonStringArray,
      splitMessageString: splitMessageWithTokens
        .filter(cns => cns.isReplacementToken || (!!cns.messageString && !!cns.messageString.trim()))
    };
  }

  private hasNextPosition(stringLength: number, currentPosition: number): boolean {
    const longestIdentifier = Math.max(this.tokens.jsonEndToken.length, this.tokens.jsonStartToken.length);
    const maxIndex = stringLength - 1;

    return currentPosition + longestIdentifier < maxIndex;
  }
}
