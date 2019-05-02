import { Injectable } from '@angular/core'
import { selectUser } from '../../actions/users/users.selectors'
import { State } from '../../reducers'
import { select, Store } from '@ngrx/store'
import * as Debug from 'debug'

const debug = Debug('bh:storage')

@Injectable({providedIn: 'root'})

export class StorageService {

  username: string

  constructor(private store: Store<State>) {

    this.store.pipe(
      select(selectUser)
    ).subscribe(user => {
      this.username = user ? user.username : null
    })
  }

  // noinspection JSMethodCanBeStatic
  setLocalStorage(key, value) {
    value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }

  setLocalStorageForUser(key, value) {
    if (this.username) {
      key = this.username + '-' + key
      this.setLocalStorage(key, value)
    } else {
      debug(`Unable to SET local storage for user with key ${key} because there is no user`)
    }
  }

  // noinspection JSMethodCanBeStatic
  getLocalStorage(key) {
    let value = localStorage.getItem(key)
    if (value != null) {
      value = JSON.parse(value)
    } else {
      debug('Unable to GET local storage with key', key)
    }
    return value
  }

  getLocalStorageForUser(key) {
    if (this.username) {
      key = this.username + '-' + key
      this.getLocalStorage(key)
    } else {
      debug(`Unable to GET local storage for user with key ${key} because there is no user`)
    }
  }
}
