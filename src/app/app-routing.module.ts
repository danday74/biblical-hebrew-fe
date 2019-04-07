import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BlankComponent } from '@app/base/blank/blank.component'

const routes: Routes = [
  {path: 'questions', loadChildren: './routes/questions/questions.module#QuestionsModule'},
  {path: 'challenges', loadChildren: './routes/challenges/challenges.module#ChallengesModule'},
  {path: 'scores', loadChildren: './routes/scores/scores.module#ScoresModule'},
  {path: 'options', loadChildren: './routes/options/options.module#OptionsModule'},
  {path: 'blank', component: BlankComponent},
  {path: '**', redirectTo: '/questions'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
