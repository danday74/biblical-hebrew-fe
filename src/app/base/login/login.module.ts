import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BaseSharedModule } from '@app/base/base-shared/base-shared.module'
import { BlankBoardComponent } from '@app/base/login/login/blank-board/blank-board.component'
import { LoginComponent } from '@app/base/login/login/login.component'
import { DirectivesModule } from '@app/directives/directives.module'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    BlankBoardComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BaseSharedModule,
    DirectivesModule, // this is needed
    FontAwesomeModule
  ],
  exports: [
    LoginComponent
  ]
})

export class LoginModule {}
