import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FeedsComponent } from './home/feeds/feeds.component';
import { LoginsignupComponent } from './home/loginsignup/loginsignup.component';

import { TabsComponent } from './home/tabs/tabs.component';
import { ProfilemodalComponent } from './home/profilemodal/profilemodal.component';
import { CommentModalComponent } from './home/comment-modal/comment-modal.component';
import { EnactModalComponent } from './home/enact-modal/enact-modal.component';

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
    ProfilemodalComponent,
    CommentModalComponent,
    EnactModalComponent
  ],
  entryComponents: [LoginsignupComponent, ProfilemodalComponent, CommentModalComponent, EnactModalComponent],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [NgbActiveModal, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
