import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import * as io from 'socket.io-client'
import { Observable, of, Subject } from 'rxjs'
import { catchError, filter, map } from 'rxjs/operators'

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

  request(action: string, payload: any = null) {
    this.messages.next({action, payload})
    return this.messages.pipe(
      filter((res) => res.action === action),
      map((res) => res.payload),
      // take(1),
      catchError(() => of(null))
    )
  }
}
