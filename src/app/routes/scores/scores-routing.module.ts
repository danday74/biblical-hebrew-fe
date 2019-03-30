import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ScoresComponent } from '@app/routes/scores/scores.component'

const routes: Routes = [
  {
    path: '',
    component: ScoresComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ScoresRoutingModule {}
