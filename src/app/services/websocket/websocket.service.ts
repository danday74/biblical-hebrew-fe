import { Injectable } from '@angular/core'
import { CustomAction } from '../../actions/custom-action'
import { environment } from '../../../environments/environment'
import { Observable, Subject } from 'rxjs'
import io from 'socket.io-client'

@Injectable({providedIn: 'root'})

export class WebSocketService {

  messages: Subject<CustomAction>

  private socket: any

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
