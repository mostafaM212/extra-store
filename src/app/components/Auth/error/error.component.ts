import { Component, Input, OnInit } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  @Input('errorMessage') message: string = '';
  errorIcon = faExclamationTriangle;
  constructor() {}

  ngOnInit(): void {}
}
