import { Component, OnInit } from '@angular/core'
import { WebsocketService } from '@app/services/websocket.service'

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})

export class OneComponent implements OnInit {

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.messages.subscribe(({action, payload}) => {
      console.log('incoming message', action, payload)
    })

    this.websocketService.messages.next({action: 'message-to-server', payload: 'green'})
  }
}
