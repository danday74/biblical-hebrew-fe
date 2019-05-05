import { Action } from '@ngrx/store'

export enum UiActionTypes {
  SetKeyboardOpen = '[UI] Set Keyboard Open'
}

export class SetKeyboardOpenAction implements Action {
  readonly type = UiActionTypes.SetKeyboardOpen

  constructor(public payload: boolean) {}
}

export type UiActions =
  | SetKeyboardOpenAction
