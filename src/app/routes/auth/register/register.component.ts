import { NgForm } from '@angular/forms';
import { countryList } from './../../../helpers/Counteries';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService.service';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userPlus = faUserPlus;
  countries: string[] = countryList;
  @ViewChild('form') form: NgForm | undefined;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmitHandler = () => {
    let user = new User(
      Math.random(),
      this.form?.value['email'],
      this.form?.value['username'],
      this.form?.value['password'],
      {
        firstname: this.form?.value['fname'],
        lastname: this.form?.value['lname'],
      },
      {
        city: this.form?.value['city'],
        zipcode: this.form?.value['zipCode'],
        street: this.form?.value['street'],
        number: this.form?.value['number'],
        geolocation: {
          lat: '-37.3159',
          long: '81.1496',
        },
      },
      this.form?.value['phone']
    );
    this.authService.register(user);
  };
}
