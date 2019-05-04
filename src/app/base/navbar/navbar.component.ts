import { Component, OnInit } from '@angular/core'
import { LogoutAction } from '@app/actions/users/users.actions'
import { selectUser } from '@app/actions/users/users.selectors'
import { State } from '@app/reducers'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  faSignOutAlt = faSignOutAlt

  user$

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectUser))
  }

  logout() {
    this.store.dispatch(new LogoutAction())
  }
}
