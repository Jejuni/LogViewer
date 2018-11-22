import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './FeatureModules/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialImportsModule } from './FeatureModules/angular-material-imports.module';
import { DetailTreeViewComponent } from './SubComponents/detail-tree-view/detail-tree-view.component';
import { LogEntryDetailsComponent } from './SubComponents/log-entry-details/log-entry-details.component';
import { LogEntryTableComponent } from './SubComponents/log-entry-table/log-entry-table.component';
import { FilterTextBoxComponent } from './SubComponents/filter-text-box/filter-text-box.component';
import { MasterFilterContainerComponent } from './SubComponents/master-filter-container/master-filter-container.component';
import { FormsModule } from '@angular/forms';
import { CollapsibleContainerComponent } from './SubComponents/collapsible-container/collapsible-container.component';
import { LoglevelDisplaysComponent } from './SubComponents/loglevel-displays/loglevel-displays.component';
import { HeaderToolbarComponent } from './SubComponents/header-toolbar/header-toolbar.component';
import { HeaderSplashScreenComponent } from './SubComponents/header-splash-screen/header-splash-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailTreeViewComponent,
    LogEntryDetailsComponent,
    LogEntryTableComponent,
    FilterTextBoxComponent,
    MasterFilterContainerComponent,
    CollapsibleContainerComponent,
    LoglevelDisplaysComponent,
    HeaderToolbarComponent,
    HeaderSplashScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialImportsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
