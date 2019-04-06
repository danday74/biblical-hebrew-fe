import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators'
import { getActionHttpPath, getFailedAction, getLoadedAction } from '@app/utils/utils'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'
import * as Debug from 'debug'

const debug = Debug('bh:effects:generic')

@Injectable()

export class GenericEffects {

  // When a "Requested" action is fired, this makes the request and then dispatches a "Loaded" action

  @Effect()
  requested$ = this.actions$.pipe(
    filter(action => action.type.endsWith('Requested')),
    map(action => ({
      action,
      path: getActionHttpPath(action),
      loadedAction: getLoadedAction(action),
      failedAction: getFailedAction(action)
    })),
    filter(obj => obj.loadedAction != null),
    tap(obj => debug('HTTP GET', obj.path)),
    mergeMap((obj) =>
      this.http.get(obj.path).pipe(
        map(res => ({...obj, res})),
        catchError(() => {
          return of({...obj, res: null})
        })
      )
    ),
    map(obj => obj.res == null ? new obj.failedAction() : new obj.loadedAction(obj.res))
  )

  constructor(private actions$: Actions, private http: HttpClient) {}
}
