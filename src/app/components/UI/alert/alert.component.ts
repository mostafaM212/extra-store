import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('translate', [
      state(
        'we',
        style({
          transform: 'translateX(0px)',
        })
      ),
      transition(
        'void<=>*',
        animate(
          500,
          style({
            transform: 'translateX(-1000px)',
          })
        )
      ),
    ]),
  ],
})
export class AlertComponent implements OnInit {
  @Input('message') message: string = '';
  alertIcon = faArrowRight;
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.message = '';
    }, 4000);
  }
}
