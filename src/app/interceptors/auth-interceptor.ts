import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LogoutAction } from '@app/actions/users/users.actions'
import { State } from '@app/reducers'
import { Store } from '@ngrx/store'
import * as Debug from 'debug'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

const debug = Debug('bh:auth-interceptor')

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<State>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          if (!request.url.endsWith('/api/whoami') && !request.url.endsWith('/api/logout')) {
            debug(`intercepting a ${error.status} at ${request.url} and logging out`)
            this.store.dispatch(new LogoutAction())
          }
        }
        return throwError(error)
      })
    )
  }
}
