import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { QuestionsRoutingModule } from './questions-routing.module'
import { QuestionsComponent } from './questions.component'

@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule
  ]
})

export class QuestionsModule {}
