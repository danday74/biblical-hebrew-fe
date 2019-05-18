import { Component, EventEmitter, Input, Output } from '@angular/core'
import { memoize } from '@app/decorators/memoize'
import hebrewConsonants from '@app/json/hebrew-consonants.json'
import hebrewVowels from '@app/json/hebrew-vowels.json'
import { isInteger } from '@app/utils/utils'
import { find } from 'lodash'

const specials = ['backspace', 'caps', 'enter', 'left', 'right']

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})

export class KeyComponent {

  @Input() en: string
  @Input() he: string
  @Input() lang: string
  @Input() lower: boolean
  @Input() vowelToggle: boolean

  @Output() readonly key = new EventEmitter<string>()
  @Output() readonly toggleCase = new EventEmitter<boolean>()

  @memoize(['this.en', 'this.he', 'this.lang', 'this.lower'])
  get char() {
    let name: string = null
    let title = ''
    let value: string
    let isHeVowel = false
    if (this.lang === 'en') {
      value = this.lower && this.en ? this.en.toLowerCase() : this.en
    } else if (this.lang === 'he') {
      const consonant = find(hebrewConsonants, {name: this.he})
      const vowel = find(hebrewVowels, {name: this.he})
      if (consonant) {
        name = consonant.name
        title = consonant.title
        value = consonant.value
      } else if (vowel) {
        name = vowel.name
        title = vowel.title
        value = vowel.value
        isHeVowel = true
      } else {
        value = this.he
      }
    }
    const isNumeric = isInteger(this.en)
    const isSpecial = specials.includes(this.en)
    return {name, title, value, isHeVowel, isNumeric, isSpecial}
  }

  onKey() {
    this.key.emit(this.char.value)
  }

  onCaps() {
    this.toggleCase.emit(this.lower)
  }
}
