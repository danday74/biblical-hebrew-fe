import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { ClearInputBlurAction, InputBlurAction } from '@app/actions/ui/ui.actions'
import { selectInputBlur } from '@app/actions/ui/ui.selectors'
import { State } from '@app/reducers'
import { Comm, CommsEnum, CommsService } from '@app/services/comms/comms.service'
import { DestroyerDirective } from '@app/utils/destroyer.directive'
import { asNumber, splitAtIndex, splitAtIndices } from '@app/utils/utils'
import { select, Store } from '@ngrx/store'
import * as $ from 'jquery'
import { filter, takeUntil } from 'rxjs/operators'

@Directive({selector: '[appInputBlur]'})
export class InputBlurDirective extends DestroyerDirective implements OnInit, OnDestroy {

  @Input() appInputBlurControl = false
  @Output() readonly appInputBlurValue = new EventEmitter<string>()
  @Output() readonly appInputBlurEnter = new EventEmitter<any>()

  private el: any
  private name: string
  private underKeyboardControlTimeout: number
  private value: string

  constructor(private elementRef: ElementRef, private commsService: CommsService, private store: Store<State>) {
    super()
    this.addClass = this.addClass.bind(this)
    this.removeClass = this.removeClass.bind(this)
  }

  ngOnInit() {
    // wont set name for [name]='name' bindings without setTimeout wrapper
    setTimeout(() => {

      this.el = $(this.elementRef.nativeElement)
      this.name = this.el.attr('name')

      this.el.addClass('input-blur')

      if (this.appInputBlurControl) {
        this.addClass()
        const maxLength = this.el.attr('maxLength')
        this.setInputBlurData({
          name: this.name,
          value: '',
          maxLength: asNumber(maxLength),
          selectionStart: 0,
          selectionEnd: 0
        })
      }

      this.store.pipe(
        takeUntil(this.unsubscribe$),
        select(selectInputBlur)
      ).subscribe(inputBlur => {
          if (inputBlur.name === this.name) {
            this.el.addClass('just-under-keyboard-control')
            this.underKeyboardControlTimeout = setTimeout(this.addClass, 200)
          } else {
            this.removeClass()
          }
        }
      )

      this.commsService.comms$.pipe(
        takeUntil(this.unsubscribe$),
        filter((comm: Comm) => comm.type === CommsEnum.Keyboard && comm.payload.name === this.name)
      ).subscribe((comm: Comm) => {

        const {payload} = comm

        if (payload.char === 'enter') {
          this.appInputBlurEnter.emit({target: {name: payload.name}})
        } else {

          const {lang, value, maxLength, selectionStart, selectionEnd /* , timestamp */} = payload
          let {char} = payload

          let caretPos: number
          let newValue: string

          if (lang === 'he') {
            if (char === 'left') {
              char = 'right'
            } else if (char === 'right') {
              char = 'left'
            }
          }

          if (char === 'focus') {
            this.setFocus()
          } else if (char === 'left') {
            caretPos = selectionStart ? selectionStart - 1 : 0
            this.setFocus(caretPos)
          } else if (char === 'right') {
            caretPos = selectionStart + 1
            this.setFocus(caretPos)
          } else {

            if (char === 'backspace') {
              if (selectionStart === selectionEnd) {
                const parts = splitAtIndex(value, selectionStart)
                newValue = parts[0].substring(0, parts[0].length - 1) + parts[1]
                caretPos = selectionStart > 0 ? selectionStart - 1 : 0
              } else {
                const parts = splitAtIndices(value, [selectionStart, selectionEnd])
                newValue = parts[0] + parts[2]
                caretPos = selectionStart
              }
            } else {
              if (selectionStart === selectionEnd) {
                const parts = splitAtIndex(value, selectionStart)
                const tempValue = parts[0] + char + parts[1]
                newValue = tempValue.length <= maxLength ? tempValue : value
                caretPos = newValue === value ? selectionStart : selectionStart + char.length
              } else {
                const parts = splitAtIndices(value, [selectionStart, selectionEnd])
                newValue = parts[0] + char + parts[2]
                caretPos = selectionStart + char.length
              }
            }

            this.appInputBlurValue.emit(newValue)
            this.setFocus(caretPos)
          }
        }
      })
    })
  }

  ngOnDestroy() {
    this.removeClass()
    super.ngOnDestroy()
  }

  @HostListener('focus')
  onFocus() {
    this.removeClass()
    this.store.dispatch(new ClearInputBlurAction())
  }

  @HostListener('blur', ['$event'])
  onBlur(evt) {
    this.setInputBlurData(evt.target)
  }

  private setFocus(caretPos: number = null) {
    this.el.focus()
    if (caretPos != null) {
      setTimeout(() => {
        this.el[0].setSelectionRange(caretPos, caretPos)
      }, 0)
    }
  }

  private setInputBlurData(target) {
    const payload = {
      name: target.name,
      value: target.value,
      maxLength: target.maxLength,
      selectionStart: target.selectionStart,
      selectionEnd: target.selectionEnd
    }
    this.store.dispatch(new InputBlurAction(payload))
  }

  private addClass() {
    this.el.removeClass('just-under-keyboard-control')
    this.el.addClass('under-keyboard-control')
  }

  private removeClass() {
    clearTimeout(this.underKeyboardControlTimeout)
    this.el.removeClass('just-under-keyboard-control')
    this.el.removeClass('under-keyboard-control')
  }
}
