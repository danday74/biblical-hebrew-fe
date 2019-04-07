import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { State } from '@app/reducers'
import { selectUser } from '@app/actions/users/users.selectors'

@Injectable({providedIn: 'root'})

export class StorageService {

  userSlug: string

  constructor(private store: Store<State>) {

    this.store.pipe(
      select(selectUser)
    ).subscribe(user => {
      this.userSlug = user ? user.slug : null
    })
  }

  // noinspection JSMethodCanBeStatic
  setLocalStorage(key, value) {
    value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }

  setLocalStorageForUser(key, value) {
    if (this.userSlug) {
      key = this.userSlug + '-' + key
      this.setLocalStorage(key, value)
    } else {
      console.warn(`Unable to SET local storage for user with key ${key} because there is no user`)
    }
  }

  // noinspection JSMethodCanBeStatic
  getLocalStorage(key) {
    let value = localStorage.getItem(key)
    if (value != null) {
      value = JSON.parse(value)
    } else {
      console.warn('Unable to GET local storage with key', key)
    }
    return value
  }

  getLocalStorageForUser(key) {
    if (this.userSlug) {
      key = this.userSlug + '-' + key
      this.getLocalStorage(key)
    } else {
      console.warn(`Unable to GET local storage for user with key ${key} because there is no user`)
    }
  }
}
