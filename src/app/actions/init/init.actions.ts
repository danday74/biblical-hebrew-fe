import { Action } from '@ngrx/store'

export enum InitActionTypes {
  Init = '[Init] Init',
  InitOnLogin = '[Init] Init On Login',
  ResetStore = '[Init] Reset Store'
}

export class InitAction implements Action {
  readonly type = InitActionTypes.Init
}

export class InitOnLoginAction implements Action {
  readonly type = InitActionTypes.InitOnLogin
}

export class ResetStoreAction implements Action {
  readonly type = InitActionTypes.ResetStore
}

// export type InitActions =
//   | InitAction
//   | InitOnLoginAction
//   | ResetStoreAction
