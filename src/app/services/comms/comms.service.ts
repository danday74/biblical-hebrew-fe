import { Injectable } from '@angular/core'
import { CommsEnum } from '@app/enums/comms.enum'
import { BehaviorSubject, Subject } from 'rxjs'

export interface Comm {
  type: CommsEnum,
  payload: any
}

@Injectable({providedIn: 'root'})

export class CommsService {

  private commsSource = new Subject<Comm>()
  comms$ = this.commsSource.asObservable() // tslint:disable-line:member-ordering

  private commsBehaviorSource = new BehaviorSubject<Comm>({type: null, payload: null})
  commsBehavior$ = this.commsBehaviorSource.asObservable() // tslint:disable-line:member-ordering

  constructor() {}

  send(comm: Comm) {
    this.commsSource.next(comm)
  }

  sendBehavior(comm: Comm) {
    this.commsBehaviorSource.next(comm)
  }
}
