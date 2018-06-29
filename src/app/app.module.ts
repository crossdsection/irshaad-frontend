import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FeedsComponent } from './home/feeds/feeds.component';
import { LoginsignupComponent } from './home/loginsignup/loginsignup.component';

import { TabsComponent } from './home/tabs/tabs.component';
import { ProfileModalComponent } from './home/profilemodal/profilemodal.component';
import { CommentModalComponent } from './home/comment-modal/comment-modal.component';
import { EnactModalComponent } from './home/enact-modal/enact-modal.component';

import { UserdataService } from './services/userdata.service';
import { HttpService } from './services/http.service';
import { GeolocationService } from './services/geolocation.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { FavLocationComponent } from './home/fav-location/fav-location.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FeedsComponent,
    LoginsignupComponent,
    TabsComponent,
    ProfileModalComponent,
    CommentModalComponent,
    EnactModalComponent,
    UserProfileComponent,
    FavLocationComponent
  ],
  entryComponents: [LoginsignupComponent, ProfileModalComponent, CommentModalComponent, EnactModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    NgbActiveModal,
    HttpService,
    GeolocationService,
    UserdataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
