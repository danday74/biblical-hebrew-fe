import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BaseSharedModule } from '@app/base/base-shared/base-shared.module'
import { BotEyesComponent } from '@app/base/signup/signup/bot-eyes/bot-eyes.component'
import { CookiePolicyCheckboxComponent } from '@app/base/signup/signup/cookie-policy-checkbox/cookie-policy-checkbox.component'
import { CookiePolicyComponent } from '@app/base/signup/signup/cookie-policy/cookie-policy.component'
import { SignupComponent } from '@app/base/signup/signup/signup.component'
import { DirectivesModule } from '@app/directives/directives.module'
import { LayoutModule } from '@app/reusable/layout.module'
import { RecaptchaModule } from 'ng-recaptcha'

@NgModule({
  declarations: [
    BotEyesComponent,
    CookiePolicyCheckboxComponent,
    CookiePolicyComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BaseSharedModule,
    DirectivesModule,
    LayoutModule,
    RecaptchaModule
  ],
  exports: [
    SignupComponent
  ]
})

export class SignupModule {}
