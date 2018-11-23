import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DisplayCookieSettings } from '../Models/displayCookieSettings';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private renderer: Renderer2;
  private cookieName = 'LogViewerDisplaySettings';

  constructor(rendererFactory: RendererFactory2, private cookieService: CookieService) {
    this.renderer = rendererFactory.createRenderer(null, null);
    if (cookieService.check(this.cookieName)) {
      this.settings = JSON.parse(cookieService.get(this.cookieName));
      if (this.settings.isDarkTheme) {
        this.renderer.addClass(document.body, 'custom-app-theme-dark');
      }
    } else {
      this.settings = new DisplayCookieSettings();
    }
  }

  public settings: DisplayCookieSettings;

  changeDisplaySetting() {
    this.settings.isInfiniteTableSet = !this.settings.isInfiniteTableSet;
    this.cookieService.set(this.cookieName, JSON.stringify(this.settings), undefined, '/');
  }

  changeTheme() {
    this.settings.isDarkTheme ? this.renderer.removeClass(document.body, 'custom-app-theme-dark') :
      this.renderer.addClass(document.body, 'custom-app-theme-dark');

    // this.isDarkTheme = !this.isDarkTheme;
    this.settings.isDarkTheme = !this.settings.isDarkTheme;
    this.cookieService.set(this.cookieName, JSON.stringify(this.settings), undefined, '/');
  }
}
