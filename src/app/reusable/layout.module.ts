import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { OverlayComponent } from '@app/reusable/layout/overlay/overlay.component'

@NgModule({
  declarations: [
    OverlayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OverlayComponent
  ]
})

export class LayoutModule {}
