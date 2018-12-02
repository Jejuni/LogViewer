import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { JsonTokens } from './app/Models/JsonTokens';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const jsonTokens = {
    jsonEndToken: '::>',
    jsonStartToken: '<::',
    jsonReplacementToken: '{{JSON}}'
};

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  { provide: JsonTokens, useValue: jsonTokens, deps: []}
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
