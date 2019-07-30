import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StopWatchComponent } from './stop-watch/stop-watch.component';
import { DnDComponent } from './dn-d/dn-d.component';
import { OtherOperatorsComponent } from './other-operators/other-operators.component';
import { PigLatinComponent } from './pig-latin/pig-latin.component';
import { MosaicComponent } from './mosaic/mosaic.component';

@NgModule({
  declarations: [
    AppComponent,
    StopWatchComponent,
    DnDComponent,
    OtherOperatorsComponent,
    PigLatinComponent,
    MosaicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }