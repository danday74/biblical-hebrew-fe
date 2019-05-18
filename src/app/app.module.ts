import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { GenericEffects } from '@app/actions/generic/generic.effects'
import { InitEffects } from '@app/actions/init/init.effects'
import { UiEffects } from '@app/actions/ui/ui.effects'
import { KeyboardModule } from '@app/base/keyboard/keyboard.module'
import { environment } from '@environments/environment'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowAltCircleUp,
  faBackspace,
  faBullseye,
  faCaretLeft,
  faCaretRight,
  faCheck,
  faEye,
  faGlobe,
  faLevelDownAlt,
  fas,
  faSignOutAlt,
  faStepForward,
  faTimes,
  faTimesCircle,
  faToggleOn,
  faWindowMinimize
} from '@fortawesome/free-solid-svg-icons'
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
import { FooterComponent } from './base/footer/footer.component'
import { BlankBoardComponent } from './base/login/blank-board/blank-board.component'
import { LoginComponent } from './base/login/login.component'
import { NavbarComponent } from './base/navbar/navbar.component'
import { OutletWrapperComponent } from './base/outlet-wrapper/outlet-wrapper.component'
import { OverlayComponent } from './base/overlay/overlay.component'
import { AnimateInOutWrapperComponent } from './base/shared/animate-in-out-wrapper/animate-in-out-wrapper.component'
import { PasswordComponent } from './base/shared/password/password.component'
import { BotEyesComponent } from './base/signup/bot-eyes/bot-eyes.component'
import { CookiePolicyCheckboxComponent } from './base/signup/cookie-policy-checkbox/cookie-policy-checkbox.component'
import { CookiePolicyComponent } from './base/signup/cookie-policy/cookie-policy.component'
import { SignupComponent } from './base/signup/signup.component'
import { GaClickEventTrackerDirective } from './directives/ga-click-event-tracker.directive'
import { InputBlurDirective } from './directives/input-blur.directive'
import { AuthInterceptor } from './interceptors/auth-interceptor'
import { metaReducers, reducers } from './reducers'
import { DestroyerComponent } from './utils/destroyer.component'
import { DestroyerDirective } from './utils/destroyer.directive'

@NgModule({
  declarations: [
    AppComponent,
    AnimateInOutWrapperComponent,
    BlankBoardComponent,
    BlankComponent,
    BotEyesComponent,
    CookiePolicyCheckboxComponent,
    CookiePolicyComponent,
    DestroyerComponent,
    DestroyerDirective,
    FooterComponent,
    GaClickEventTrackerDirective,
    InputBlurDirective,
    LoginComponent,
    NavbarComponent,
    OutletWrapperComponent,
    OverlayComponent,
    PasswordComponent,
    SignupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    KeyboardModule,
    RecaptchaModule,
    EffectsModule.forRoot([UiEffects, UsersEffects, GenericEffects, InitEffects]),
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    // @ts-ignore
    library.add(far, fas)
    library.add(faArrowAltCircleUp)
    library.add(faBackspace, faBullseye)
    library.add(faCaretLeft, faCaretRight, faCheck)
    library.add(faEye)
    library.add(faGlobe)
    library.add(faLevelDownAlt)
    library.add(faSignOutAlt, faStepForward)
    library.add(faTimes, faTimesCircle, faToggleOn)
    library.add(faWindowMinimize)
  }
}

if (environment.debug) {
  Debug.enable(environment.debug)
} else {
  Debug.disable()
}
