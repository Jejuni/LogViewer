import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInfoRetrieverService } from 'src/app/Services/log-info-retriever.service';

@Component({
  selector: 'app-header-splash-screen',
  templateUrl: './header-splash-screen.component.html',
  styleUrls: ['./header-splash-screen.component.scss']
})
export class HeaderSplashScreenComponent implements OnInit {

  constructor(private logService: LogInfoRetrieverService) { }

  public envName$: Observable<string>;

  ngOnInit() {
    this.envName$ = this.logService.getHostingEnvName();
  }

}
