import { Action } from '@ngrx/store'

export enum UiActionTypes {
  InputBlur = '[UI] Input Blur',
  ClearInputBlur = '[UI] Clear Input Blur',
  SetKeyboardOpen = '[UI] Set Keyboard Open'
}

export class InputBlurAction implements Action {
  readonly type = UiActionTypes.InputBlur

  constructor(public payload: any) {}
}

export class ClearInputBlurAction implements Action {
  readonly type = UiActionTypes.ClearInputBlur
}

export class SetKeyboardOpenAction implements Action {
  readonly type = UiActionTypes.SetKeyboardOpen

  constructor(public payload: boolean) {}
}

export type UiActions =
  | InputBlurAction
  | ClearInputBlurAction
  | SetKeyboardOpenAction
