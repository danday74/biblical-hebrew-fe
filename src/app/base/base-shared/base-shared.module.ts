import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AnimateInOutWrapperComponent } from '@app/base/base-shared/animate-in-out-wrapper/animate-in-out-wrapper.component'
import { PasswordComponent } from '@app/base/base-shared/password/password.component'
import { DirectivesModule } from '@app/directives/directives.module'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AnimateInOutWrapperComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    FontAwesomeModule
  ],
  exports: [
    AnimateInOutWrapperComponent,
    PasswordComponent
  ]
})

export class BaseSharedModule {}
