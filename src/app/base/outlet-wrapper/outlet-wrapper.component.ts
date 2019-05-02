import { Component, OnDestroy, OnInit } from '@angular/core'
import { InitOnLoginAction } from '@app/actions/init/init.actions'
import { State } from '@app/reducers'
import { UserService } from '@app/services/user/user.service'
import { Store } from '@ngrx/store'
import * as Debug from 'debug'

const debug = Debug('bh:auth-check')

@Component({
  selector: 'app-outlet-wrapper',
  templateUrl: './outlet-wrapper.component.html',
  styleUrls: ['./outlet-wrapper.component.scss']
})

export class OutletWrapperComponent implements OnInit, OnDestroy {

  private interval: any

  constructor(private userService: UserService, private store: Store<State>) {}

  ngOnInit() {
    this.interval = setInterval(() => {
      debug('checking authentication')
      this.userService.authenticated().subscribe(() => {}, () => {})
    }, 60000)

    this.store.dispatch(new InitOnLoginAction())
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }
}
