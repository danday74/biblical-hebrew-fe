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
import { InitEffects } from '@app/actions/init/init.effects'
import { HttpClientModule } from '@angular/common/http'
import { GenericEffects } from '@app/actions/generic/generic.effects'
import * as Debug from 'debug'
import { NavbarComponent } from './base/navbar/navbar.component'
import { UserFinderComponent } from './base/user-finder/user-finder.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserFinderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AppEffects, GenericEffects, InitEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}

if (environment.debug) {
  Debug.enable(environment.debug)
} else {
  Debug.disable()
}
