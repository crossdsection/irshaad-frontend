import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LocationTabComponent } from './location-tab/location-tab.component';
import { LocationMenuComponent } from './location-menu/location-menu.component';
import { BreadcrumbBarComponent } from './breadcrumb-bar/breadcrumb-bar.component';
import { AnalyticsBarComponent } from './analytics-bar/analytics-bar.component';
import { EnactFeedsComponent } from './enact-feeds/enact-feeds.component';
import { EnactFeedsFocusComponent } from './enact-feeds-focus/enact-feeds-focus.component';
import { CountryFlagDisplayComponent } from './country-flag-display/country-flag-display.component';
import { HeaderProfileIconComponent } from './header-profile-icon/header-profile-icon.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { ChangeLocationComponent } from './change-location/change-location.component';
import { FavLocationTileComponent } from './fav-location-tile/fav-location-tile.component';
import { FavLocationListGridComponent } from './fav-location-list-grid/fav-location-list-grid.component';
import { GovtDeptListGridComponent } from './govt-dept-list-grid/govt-dept-list-grid.component';
import { EnactPopupComponent } from './enact-popup/enact-popup.component';
import { EnactCardComponent } from './enact-card/enact-card.component';
import { EnactCardsComponent } from './enact-cards/enact-cards.component';
import { RightOverlayComponent } from './right-overlay/right-overlay.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSummaryTileComponent } from './user-summary-tile/user-summary-tile.component';
import { EnactDetailComponent } from './enact-detail/enact-detail.component';
import { EnactionLinkComponent } from './enaction-link/enaction-link.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { CommentComponent } from './comment/comment.component';

import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { CarouselModule } from 'angular4-carousel';

const routes: Routes = [
  { path: '', component: EnactFeedsFocusComponent },
  { path: 'home', component: EnactFeedsFocusComponent },
  { path: 'enaction', component: EnactionLinkComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LocationTabComponent,
    LocationMenuComponent,
    BreadcrumbBarComponent,
    AnalyticsBarComponent,
    EnactFeedsComponent,
    EnactFeedsFocusComponent,
    CountryFlagDisplayComponent,
    HeaderProfileIconComponent,
    LoginPopupComponent,
    ChangeLocationComponent,
    FavLocationTileComponent,
    FavLocationListGridComponent,
    GovtDeptListGridComponent,
    EnactPopupComponent,
    EnactCardComponent,
    EnactCardsComponent,
    RightOverlayComponent,
    ProfileComponent,
    UserSummaryTileComponent,
    EnactDetailComponent,
    EnactionLinkComponent,
    CommentComponent
  ],
  entryComponents: [
    LoginPopupComponent,
    ChangeLocationComponent,
    EnactPopupComponent,
    ProfileComponent,
    EnactDetailComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAGvUJIs_SRj6bKpbQvNOWHxDjwnSqlvdE',
      libraries: ['places']
    }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot( routes ),
    JwSocialButtonsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useValue : '/'
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
