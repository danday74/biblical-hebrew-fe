import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { ControlContainer, NgForm } from '@angular/forms'

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})

export class PasswordComponent implements OnInit {

  @ViewChild('passwordInput') passwordInput: ElementRef // this is used
  @Input() autocomplete: boolean
  @Input() forceFailure = false
  @Input() hideFeedback = false
  @Output() readonly enterKeyPress = new EventEmitter<any>()
  @Output() readonly passwordChange = new EventEmitter<string>()

  password = ''
  pattern = '^[a-zA-Z0-9\u0590-\u05FF]+$'
  showPassword = false
  strAutocomplete: string

  ngOnInit() {
    this.strAutocomplete = this.autocomplete === true ? 'on' : this.autocomplete === false ? 'off' : 'new-password'
  }

  onEnter(evt) {
    this.enterKeyPress.emit(evt)
  }

  onPasswordChange(password) {
    this.password = password
    this.passwordChange.emit(password)
  }

  showPwd() {
    this.showPassword = true
  }

  noShowPwd() {
    this.showPassword = false
  }
}
