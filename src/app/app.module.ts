import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { 
  AppComponent, 
  AddDialogComponent,
  UpdateDialogComponent,
  DeleteDialogComponent
} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMdModule } from './app-md.module';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddDialogComponent,
    UpdateDialogComponent,
    DeleteDialogComponent
  ],
  entryComponents: [
    AddDialogComponent,
    UpdateDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMdModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
