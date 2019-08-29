import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RoutingModule } from './routes/routing.module';
import { HeaderModule } from './components/header/header.module';
import { AuthModule } from './components/auth/auth.module';
import { HomeModule } from './components/mis/mis.module';

import { AppComponent } from './app.component';
import { SessionExpiredComponent } from './components/session-expired/session-expired.component';

import { LoginPageGuard } from './guards/login_page.guard';
import { AuthGuard } from './guards/auth.guard';

import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { AppInterceptorService } from './interceptors/app.interceptor';
import { DataStoreService } from './services/data-store.service';
import { ModalHelperService } from './services/modal-helper.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SessionExpiredComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RoutingModule,
    AuthModule,
    HeaderModule,
    HomeModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    LoginPageGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptorService, multi: true},
    AuthGuard,
    AuthService,
    ApiService,
    DataStoreService,
    ModalHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
