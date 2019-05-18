import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { KeyboardLauncherComponent } from '@app/base/keyboard-launcher/keyboard-launcher.component'
import { KeyComponent } from '@app/base/keyboard-launcher/keyboard/key/key.component'
import { KeyboardComponent } from '@app/base/keyboard-launcher/keyboard/keyboard.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AngularDraggableModule } from 'angular2-draggable'

@NgModule({
  declarations: [
    KeyboardComponent,
    KeyboardLauncherComponent,
    KeyComponent
  ],
  imports: [
    CommonModule,
    AngularDraggableModule,
    FontAwesomeModule
  ],
  exports: [
    KeyboardLauncherComponent
  ]
})

export class KeyboardLauncherModule {}
