import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LocationTabComponent } from './location-tab/location-tab.component';
import { LocationMenuComponent } from './location-menu/location-menu.component';
import { LocationMegaMenuComponent } from './location-mega-menu/location-mega-menu.component';
import { BreadcrumbBarComponent } from './breadcrumb-bar/breadcrumb-bar.component';
import { AnalyticsBarComponent } from './analytics-bar/analytics-bar.component';
import { EnactFeedsComponent } from './enact-feeds/enact-feeds.component';
import { EnactFeedsFocusComponent } from './enact-feeds-focus/enact-feeds-focus.component';
import { PollCardsComponent } from './poll-cards/poll-cards.component';
import { PollCardComponent } from './poll-card/poll-card.component';
import { CountryFlagDisplayComponent } from './country-flag-display/country-flag-display.component';
import { HeaderProfileIconComponent } from './header-profile-icon/header-profile-icon.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LocationTabComponent,
    LocationMenuComponent,
    LocationMegaMenuComponent,
    BreadcrumbBarComponent,
    AnalyticsBarComponent,
    EnactFeedsComponent,
    EnactFeedsFocusComponent,
    PollCardsComponent,
    PollCardComponent,
    CountryFlagDisplayComponent,
    HeaderProfileIconComponent,
    LoginPopupComponent
  ],
  entryComponents: [LoginPopupComponent],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAGvUJIs_SRj6bKpbQvNOWHxDjwnSqlvdE'
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],  
})
export class AppModule { }
