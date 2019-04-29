import { Component, OnInit } from '@angular/core'
import { environment } from '@environments/environment'
import moment from 'moment'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  version: string
  year: number

  ngOnInit() {
    this.version = environment.version
    this.year = moment().year()
  }
}
