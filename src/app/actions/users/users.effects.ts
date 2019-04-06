import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs/operators'
import { UserService } from '@app/services/user.service'
import { SetUserExistsAction, UsersActionTypes, GetUserExistsAction } from '@app/actions/users/users.actions'

@Injectable()

export class UsersEffects {

  @Effect()
  userExists$ = this.actions$.pipe(
    ofType<GetUserExistsAction>(UsersActionTypes.GetUserExists),
    mergeMap((action) =>
      this.userService.doesUserExist(action.payload)
    ),
    map((exists) => new SetUserExistsAction(exists))
  )

  constructor(private actions$: Actions, private userService: UserService) {}
}
