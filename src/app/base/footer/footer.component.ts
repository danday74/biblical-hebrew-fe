import { Component, OnInit } from '@angular/core'
import moment from 'moment'
import config from '../../../config'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  version: string
  year: number

  ngOnInit() {
    this.version = config.app.version
    this.year = moment().year()
  }
}
