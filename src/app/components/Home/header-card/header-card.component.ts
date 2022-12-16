import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.css'],
})
export class HeaderCardComponent implements OnInit {
  currentCardNumber: number = 0;
  headerCards: {
    path: string;
    number: number;
  }[] = [
    { path: '../../../assets/header/header1.jpg', number: 0 },
    { path: '../../../assets/header/header2.jpg', number: 1 },
    { path: '../../../assets/header/header3.jpg', number: 2 },
  ];
  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      if (this.currentCardNumber == 2) {
        this.currentCardNumber = 0;
      } else {
        this.currentCardNumber += 1;
      }
    }, 10000);
  }
  nextCard = () => {
    if (this.currentCardNumber < 2) {
      this.currentCardNumber += 1;
      console.log(this.currentCardNumber);
    }
  };
  previousCard = () => {
    if (this.currentCardNumber > 0) {
      this.currentCardNumber -= 1;
      console.log(this.currentCardNumber);
    }
  };
}
