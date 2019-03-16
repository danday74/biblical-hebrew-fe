import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {path: 'one', loadChildren: './routes/one/one.module#OneModule'},
  {path: 'two', loadChildren: './routes/two/two.module#TwoModule'},
  {path: '**', redirectTo: '/one'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
