import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { AppActionTypes, QuestionsLoadedAction, QuestionsRequestedAction } from '@app/actions/app/app.actions'
import { map, mergeMap, tap } from 'rxjs/operators'
import { WebsocketService } from '@app/services/websocket.service'

@Injectable()
export class AppEffects {

  @Effect()
  QuestionsRequested$ = this.actions$.pipe(
    ofType<QuestionsRequestedAction>(AppActionTypes.QuestionsRequested),
    tap((action) => {this.websocketService.messages.next({action: action.type, payload: null})}),
    mergeMap((action) => {
      return this.websocketService.request(action.type)
    }),
    map((payload) => new QuestionsLoadedAction(payload))
  )

  constructor(private actions$: Actions, private websocketService: WebsocketService) {}
}
