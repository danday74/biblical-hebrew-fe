import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { State } from '@app/reducers'
import { selectUser } from '@app/actions/app/app.selectors'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public user$

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectUser))
  }
}
