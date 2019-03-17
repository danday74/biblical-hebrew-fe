import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import * as io from 'socket.io-client'
import { Observable, Subject } from 'rxjs'

@Injectable({providedIn: 'root'})

export class WebsocketService {

  private socket: any
  messages: Subject<{ action: string, payload: any }>

  constructor() {

    this.socket = io(environment.wsUrl)

    const observable = new Observable(observor => {
      this.socket.on('message', (data: { action: string, payload: any }) => {
        observor.next(data)
      })
      return () => {
        this.socket.disconnect()
      }
    })

    const observer = {
      next: (data: { action: string, payload: any }) => {
        this.socket.emit('message', data)
      },
    }

    this.messages = Subject.create(observer, observable)
  }
}
