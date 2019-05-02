import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})

export class UserService {

  constructor(private http: HttpClient) {}

  authenticated() {
    return this.http.get(environment.httpPhp + '/authenticated')
  }

  create(credentials: any) {
    return this.http.post(environment.httpPhp + '/create-user', credentials).pipe(
      catchError(() => {
        return of(null)
      })
    )
  }

  doesUserExist(username: string) {
    return this.http.head(environment.httpPhp + '/user-exists/' + encodeURIComponent(username)).pipe(
      map(() => 'yes'),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) return of('no')
        return of('error')
      })
    )
  }

  login(credentials: any) {
    return this.http.post(environment.httpPhp + '/login', credentials).pipe(
      catchError(() => {
        return of(null)
      })
    )
  }

  logout() {
    return this.http.post(environment.httpPhp + '/logout', {}).pipe(
      catchError(() => {
        return of(null)
      })
    )
  }

  resolveCaptcha(captchaResponse) {
    return this.http.post(environment.httpPhp + '/recaptcha/siteverify', {captchaResponse}).pipe(
      catchError(() => {
        return of(null)
      })
    )
  }

  whoAmI() {
    return this.http.get(environment.httpPhp + '/whoami').pipe(
      catchError(() => {
        return of(null)
      })
    )
  }
}
