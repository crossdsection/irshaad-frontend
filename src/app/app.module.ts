import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FeedsComponent } from './home/feeds/feeds.component';
import { LoginsignupComponent } from './home/loginsignup/loginsignup.component';

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
    LoginsignupComponent
  ],
  entryComponents: [LoginsignupComponent],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
