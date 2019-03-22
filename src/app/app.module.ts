import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { metaReducers, reducers } from './reducers'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '@environments/environment'
import { EffectsModule } from '@ngrx/effects'
import { AppEffects } from '@app/actions/app/app.effects'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
