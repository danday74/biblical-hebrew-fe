import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { SetKeyboardOpenAction } from '@app/actions/ui/ui.actions'
import { selectInputBlur } from '@app/actions/ui/ui.selectors'
import { debounce } from '@app/decorators/debounce'
import { KeyboardSize } from '@app/enums/keyboard-size.enum'
import { State } from '@app/reducers'
import { CommsEnum, CommsService } from '@app/services/comms/comms.service'
import { StorageService } from '@app/services/storage/storage.service'
import { DestroyerComponent } from '@app/utils/destroyer.component'
import { select, Store } from '@ngrx/store'
import * as $ from 'jquery'
import { takeUntil } from 'rxjs/operators'

const keyboardHasBeenDraggedKey = 'keyboardHasBeenDragged'

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})

export class KeyboardComponent extends DestroyerComponent implements OnInit, OnChanges {

  @Input() bounds: HTMLElement
  @Input() inputHasFocus: boolean
  @Input() nextInputButtonEnabled: boolean

  @ViewChild('block') block: any

  focusInputButtonEnabled = false
  hasBeenDragged: boolean
  hasMoved = false
  keyboardSize: KeyboardSize = KeyboardSize.Small
  lang: string
  lower = false
  vowelToggle = true

  private inputBlur: any = {}

  constructor(private commsService: CommsService, private storageService: StorageService, private store: Store<State>) {
    super()
  }

  ngOnInit() {
    this.lang = navigator.language === 'he' ? 'he' : 'en'
    this.hasBeenDragged = this.storageService.getLocalStorage(keyboardHasBeenDraggedKey)
    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectInputBlur)
    ).subscribe(inputBlur => {
      this.inputBlur = inputBlur
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.inputHasFocus) this.setFocusInputButtonEnabled(changes.inputHasFocus.currentValue)
  }

  onClose() {
    this.store.dispatch(new SetKeyboardOpenAction(false))
  }

  onEndOffset(offset) {
    this.hasMoved = offset.x || offset.y
    if (!this.hasBeenDragged) {
      this.hasBeenDragged = true
      this.storageService.setLocalStorage(keyboardHasBeenDraggedKey, true)
    }
  }

  onKey(char) {
    if (this.inputBlur.name) {
      this.commsService.send({type: CommsEnum.Keyboard, payload: {...this.inputBlur, char, lang: this.lang}})
    }
  }

  onLargerKeyboard() {
    if (this.keyboardSize === KeyboardSize.Small) {
      this.keyboardSize = KeyboardSize.Medium
    } else if (this.keyboardSize === KeyboardSize.Medium) {
      this.keyboardSize = KeyboardSize.Large
    }
  }

  onMinimise() {
    this.resetPositionNow()
  }

  onNextInput() {
    if (this.nextInputButtonEnabled) {
      let idx = null
      const inputBlur = $('.input-blur')
      inputBlur.each(function(i) { // must be function
        if ($(this).hasClass('just-under-keyboard-control') || $(this).hasClass('under-keyboard-control')) idx = i
      })
      if (idx != null) {
        idx++
        if (idx === inputBlur.length) idx = 0
        inputBlur[idx].focus()
      }
    }
  }

  onSmallerKeyboard() {
    if (this.keyboardSize === KeyboardSize.Large) {
      this.keyboardSize = KeyboardSize.Medium
    } else if (this.keyboardSize === KeyboardSize.Medium) {
      this.keyboardSize = KeyboardSize.Small
    }
  }

  onToggleCase() {
    this.lower = !this.lower
  }

  onToggleLanguage() {
    if (this.lang === 'en') {
      this.lang = 'he'
    } else if (this.lang === 'he') {
      this.lang = 'en'
    }
  }

  onToggleVowels() {
    this.vowelToggle = !this.vowelToggle
  }

  @HostListener('window:resize')
  private onResize() {
    this.resetPosition()
  }

  @debounce(300, false, true)
  private resetPosition() {
    this.resetPositionNow()
  }

  private resetPositionNow() {
    this.block.resetPosition()
    this.hasMoved = false
  }

  @debounce(200, false, true)
  private setFocusInputButtonEnabled(inputHasFocus: boolean) {
    this.focusInputButtonEnabled = !inputHasFocus
  }
}
