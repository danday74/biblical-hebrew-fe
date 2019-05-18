import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core'
import { ControlContainer, NgForm } from '@angular/forms'

@Component({
  selector: 'app-cookie-policy-checkbox',
  templateUrl: './cookie-policy-checkbox.component.html',
  styleUrls: ['./cookie-policy-checkbox.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})

export class CookiePolicyCheckboxComponent {

  @ViewChild('cookiePolicyCheckbox') cookiePolicyCheckbox: ElementRef // this is used
  @Output() readonly cookiePolicyClick = new EventEmitter<boolean>()
  @Output() readonly enterKeyPress = new EventEmitter<any>()

  accept = false

  onCookiePolicyClick() {
    this.cookiePolicyClick.emit(true)
  }

  onEnter(evt) {
    this.enterKeyPress.emit(evt)
  }
}
