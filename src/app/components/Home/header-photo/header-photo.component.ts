import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-photo',
  templateUrl: './header-photo.component.html',
  styleUrls: ['./header-photo.component.css'],
})
export class HeaderPhotoComponent implements OnInit {
  @Input('currentCardNumber') currentCardNumber: number = 0;
  @Input('imagePath') path: string = '';
  @Input('imgNumber') imgNumber: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
