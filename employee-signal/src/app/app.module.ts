import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FakeBackendInterceptor } from './helpers/fake-backend';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './shared/loader/loader.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EntitySignalStore } from './signal-store/entity.signal-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntityFormComponent } from './entity/ui-components/entity-form.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true,
    },
    EntitySignalStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
