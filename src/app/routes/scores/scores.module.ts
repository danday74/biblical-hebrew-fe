import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ScoresRoutingModule } from './scores-routing.module'
import { ScoresComponent } from './scores.component'

@NgModule({
  declarations: [ScoresComponent],
  imports: [
    CommonModule,
    ScoresRoutingModule
  ]
})

export class ScoresModule {}
