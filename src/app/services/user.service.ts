import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { of } from 'rxjs'
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {}

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
}
