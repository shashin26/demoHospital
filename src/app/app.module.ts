import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { FilterPipe } from './filter.pipe';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'signUp', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'addRecord',
    component: AddRecordComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'not-found', component: PageNotFoundComponent },
  //{ path: '**', redirectTo: 'not-found' },
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    AddRecordComponent,
    FilterPipe,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [HomeComponent, AuthService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
