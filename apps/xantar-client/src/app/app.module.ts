import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoService } from '@ngneat/transloco';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp } from './application.initializer';
import { SharedModule } from './modules/shared/shared.module';
import { ApiService } from './services/api/api.service';
import { TranslocoRootModule } from './transloco-root.module';

const materialModules = [MatDialogModule, MatSelectModule, MatChipsModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslocoRootModule,
    SharedModule,
    ...materialModules
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ApiService, TranslocoService],
      multi: true
    }
  ]
})
export class AppModule {}
