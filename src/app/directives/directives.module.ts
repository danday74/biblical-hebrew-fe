import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { GaClickEventTrackerDirective } from '@app/directives/ga-click-event-tracker/ga-click-event-tracker.directive'
import { InputBlurDirective } from '@app/directives/input-blur/input-blur.directive'

@NgModule({
  declarations: [
    GaClickEventTrackerDirective,
    InputBlurDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GaClickEventTrackerDirective,
    InputBlurDirective
  ]
})

export class DirectivesModule {}
