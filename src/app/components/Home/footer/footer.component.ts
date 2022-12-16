import { Component, OnInit } from '@angular/core';
import {
  faFacebook,
  faTwitter,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  facebook = faFacebook;
  twitter = faTwitter;
  githup = faGithub;
  linked = faLinkedin;
  constructor() {}

  ngOnInit(): void {}
}
