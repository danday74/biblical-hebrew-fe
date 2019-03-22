import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { State } from '@app/reducers'
import { QuestionsRequestedAction } from '@app/actions/app/app.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new QuestionsRequestedAction())
  }
}
