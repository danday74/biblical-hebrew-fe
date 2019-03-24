import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import * as io from 'socket.io-client'
import { Observable, Subject } from 'rxjs'
import { CustomAction } from '@app/actions/custom-action'

@Injectable({providedIn: 'root'})

export class WebSocketService {

  private socket: any
  messages: Subject<CustomAction>

  constructor() {

    this.socket = io(environment.wsPhp)

    const observable = new Observable(observor => {
      this.socket.on('message', (action: CustomAction) => {
        observor.next(action)
      })
      return () => {
        this.socket.disconnect()
      }
    })

    const observer = {
      next: (action: CustomAction) => {
        this.socket.emit('message', action)
      }
    }

    this.messages = Subject.create(observer, observable)
  }
}
