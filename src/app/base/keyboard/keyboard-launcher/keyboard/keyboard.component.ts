import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { SetKeyboardOpenAction } from '@app/actions/ui/ui.actions'
import { selectInputBlur } from '@app/actions/ui/ui.selectors'
import config from '@app/app.config'
import { debounce } from '@app/decorators/debounce'
import { CommsEnum } from '@app/enums/comms.enum'
import { KeyboardFontCurrentEnum, KeyboardFontEnglishEnum, KeyboardFontHebrewEnum } from '@app/enums/keyboard-font.enum'
import { KeyboardSizeEnum } from '@app/enums/keyboard-size.enum'
import { State } from '@app/reducers'
import { Comm, CommsService } from '@app/services/comms/comms.service'
import { StorageService } from '@app/services/storage/storage.service'
import { DestroyerComponent } from '@app/utils/destroyer.component'
import { select, Store } from '@ngrx/store'
import * as $ from 'jquery'
import { filter, takeUntil } from 'rxjs/operators'

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
  keyboardFontEnglish: KeyboardFontEnglishEnum
  keyboardFontHebrew: KeyboardFontHebrewEnum
  keyboardSize: KeyboardSizeEnum
  lang: string
  lower = false
  vowelToggle = true

  private inputBlur: any = {}

  constructor(private commsService: CommsService, private storageService: StorageService, private store: Store<State>) {
    super()
  }

  ngOnInit() {
    this.setLanguage(navigator.language === 'he' ? 'he' : 'en')
    this.hasBeenDragged = this.storageService.getLocalStorage(keyboardHasBeenDraggedKey)
    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectInputBlur)
    ).subscribe(inputBlur => {
      this.inputBlur = inputBlur
    })

    this.commsService.commsBehavior$.pipe(
      takeUntil(this.unsubscribe$),
      filter((comm: Comm) => comm.type === CommsEnum.KeyboardSize)
    ).subscribe((comm: Comm) => {
      const keyboardSize: KeyboardSizeEnum = comm.payload
      const htmlTag = $('html')
      htmlTag.addClass('keyboard-size')
      htmlTag.removeClass(KeyboardSizeEnum.Small).removeClass(KeyboardSizeEnum.Medium).removeClass(KeyboardSizeEnum.Large)
      htmlTag.addClass(keyboardSize)
      this.keyboardSize = keyboardSize
    })

    this.setKeyboardFontEnglish(config.defaultFontEnglish)
    this.setKeyboardFontHebrew(config.defaultFontHebrew)
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
    if (this.keyboardSize === KeyboardSizeEnum.Small) {
      this.keyboardSize = KeyboardSizeEnum.Medium
    } else if (this.keyboardSize === KeyboardSizeEnum.Medium) {
      this.keyboardSize = KeyboardSizeEnum.Large
    }
    this.sendKeyboardSize()
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
    if (this.keyboardSize === KeyboardSizeEnum.Large) {
      this.keyboardSize = KeyboardSizeEnum.Medium
    } else if (this.keyboardSize === KeyboardSizeEnum.Medium) {
      this.keyboardSize = KeyboardSizeEnum.Small
    }
    this.sendKeyboardSize()
  }

  onToggleCase() {
    this.lower = !this.lower
  }

  onToggleFont() {
    if (this.lang === 'en') {
      let font: KeyboardFontEnglishEnum
      if (this.keyboardFontEnglish === KeyboardFontEnglishEnum.Standard) {
        font = KeyboardFontEnglishEnum.Alternative
      } else if (this.keyboardFontEnglish === KeyboardFontEnglishEnum.Alternative) {
        font = KeyboardFontEnglishEnum.Standard
      }
      this.setKeyboardFontEnglish(font)
    }
    if (this.lang === 'he') {
      let font: KeyboardFontHebrewEnum
      if (this.keyboardFontHebrew === KeyboardFontHebrewEnum.Standard) {
        font = KeyboardFontHebrewEnum.Alternative
      } else if (this.keyboardFontHebrew === KeyboardFontHebrewEnum.Alternative) {
        font = KeyboardFontHebrewEnum.Standard
      }
      this.setKeyboardFontHebrew(font)
    }
  }

  onToggleLanguage() {
    if (this.lang === 'en') {
      this.setLanguage('he')
    } else if (this.lang === 'he') {
      this.setLanguage('en')
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

  private sendKeyboardSize() {
    this.commsService.sendBehavior({type: CommsEnum.KeyboardSize, payload: this.keyboardSize})
    this.resetPositionNow()
  }

  @debounce(200, false, true)
  private setFocusInputButtonEnabled(inputHasFocus: boolean) {
    this.focusInputButtonEnabled = !inputHasFocus
  }

  private setKeyboardFontEnglish(font: KeyboardFontEnglishEnum) {
    this.keyboardFontEnglish = font
    const htmlTag = $('html')
    htmlTag.removeClass(KeyboardFontEnglishEnum.Standard).removeClass(KeyboardFontEnglishEnum.Alternative)
    htmlTag.addClass(this.keyboardFontEnglish)
  }

  private setKeyboardFontHebrew(font: KeyboardFontHebrewEnum) {
    this.keyboardFontHebrew = font
    const htmlTag = $('html')
    htmlTag.removeClass(KeyboardFontHebrewEnum.Standard).removeClass(KeyboardFontHebrewEnum.Alternative)
    htmlTag.addClass(this.keyboardFontHebrew)
  }

  private setLanguage(lang) {
    this.lang = lang
    const htmlTag = $('html')
    htmlTag.removeClass(KeyboardFontCurrentEnum.Hebrew).removeClass(KeyboardFontCurrentEnum.English)
    if (this.lang === 'he') htmlTag.addClass(KeyboardFontCurrentEnum.Hebrew)
    if (this.lang === 'en') htmlTag.addClass(KeyboardFontCurrentEnum.English)
  }
}
