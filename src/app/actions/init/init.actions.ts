import { Action } from '@ngrx/store'

export enum InitActionTypes {
  Init = '[Init] Init'
}

export class InitAction implements Action {
  readonly type = InitActionTypes.Init
}

export type InitActions =
  | InitAction
