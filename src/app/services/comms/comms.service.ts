import { Injectable } from '@angular/core'
import { CommsEnum } from '@app/enums/comms.enum'
import { Subject } from 'rxjs'

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
