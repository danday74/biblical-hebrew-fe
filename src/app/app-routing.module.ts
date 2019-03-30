import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {path: 'questions', loadChildren: './routes/questions/questions.module#QuestionsModule'},
  {path: 'two', loadChildren: './routes/two/two.module#TwoModule'},
  {path: '**', redirectTo: '/questions'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
