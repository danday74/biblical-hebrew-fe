import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { State } from '@app/reducers'
import { selectUser } from '@app/actions/app/app.selectors'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  public user$
  faSignOutAlt = faSignOutAlt

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectUser))
  }

  logout() {
    console.log('logging out')
  }
}
