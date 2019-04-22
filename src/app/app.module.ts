import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { GenericEffects } from '@app/actions/generic/generic.effects'
import { InitEffects } from '@app/actions/init/init.effects'
import { environment } from '@environments/environment'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import * as Debug from 'debug'
import { RecaptchaModule } from 'ng-recaptcha'
import { UsersEffects } from './actions/users/users.effects'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BlankComponent } from './base/blank/blank.component'
import { BlankBoardComponent } from './base/login/blank-board/blank-board.component'
import { LoginComponent } from './base/login/login.component'
import { NavbarComponent } from './base/navbar/navbar.component'
import { OutletWrapperComponent } from './base/outlet-wrapper/outlet-wrapper.component'
import { AnimateInOutWrapperComponent } from './base/shared/animate-in-out-wrapper/animate-in-out-wrapper.component'
import { PasswordComponent } from './base/shared/password/password.component'
import { SignupComponent } from './base/signup/signup.component'
import { AuthInterceptor } from './interceptors/auth-interceptor'
import { metaReducers, reducers } from './reducers'
import { DestroyerComponent } from './utils/destroyer.component'

@NgModule({
  declarations: [
    AppComponent,
    AnimateInOutWrapperComponent,
    BlankBoardComponent,
    BlankComponent,
    DestroyerComponent,
    LoginComponent,
    NavbarComponent,
    OutletWrapperComponent,
    PasswordComponent,
    SignupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    EffectsModule.forRoot([UsersEffects, GenericEffects, InitEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

if (environment.debug) {
  Debug.enable(environment.debug)
} else {
  Debug.disable()
}
