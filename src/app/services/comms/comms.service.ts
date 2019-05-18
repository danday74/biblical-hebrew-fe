import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

export enum CommsEnum {
  Keyboard = 'keyboard'
}

export interface Comm {
  type: CommsEnum,
  payload: any
}

@Injectable({providedIn: 'root'})

export class CommsService {

  private commsSource = new Subject<Comm>()
  comms$ = this.commsSource.asObservable() // tslint:disable-line:member-ordering

  constructor() {}

  send(comm: Comm) {
    this.commsSource.next(comm)
  }
}
