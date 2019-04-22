import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-blank-board',
  templateUrl: './blank-board.component.html',
  styleUrls: ['./blank-board.component.scss']
})

export class BlankBoardComponent {
  @Input() boardText1: string
  @Input() boardText2: string
  @Input() showBoardText = true
}
