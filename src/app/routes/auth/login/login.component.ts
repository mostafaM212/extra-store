import { Router } from '@angular/router';
import { User } from './../../../models/User.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AuthService } from 'src/app/services/AuthService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('rotate', [
      state(
        'with',
        style({
          transform: 'rotateX(0deg)',
        })
      ),
      transition(
        '*=>*',
        animate(
          1000,
          style({
            transform: 'rotateX(360deg)',
          })
        )
      ),
    ]),
    trigger('opacity', [
      state(
        't',
        style({
          opacity: 1,
        })
      ),
      transition('void<=>*', [
        animate(
          500,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  user = faUser;
  @ViewChild('form') form: NgForm | undefined;
  animationState: string = 'with';
  users: User[] = [];
  disabled: boolean = false;
  error: string = '';
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.animationState = Math.random() + '';
    }, 3000);

    this.http
      .get<User[]>('https://fakestoreapi.com/users')
      .subscribe((data) => {
        this.users = data;
      });
    this.authService.logginError.subscribe((data) => {
      if (data) {
        this.error = data;
        this.loading = false;
        setTimeout(() => {
          this.error = '';
        }, 5000);
      }
    });
  }

  onSubmitHandler = () => {
    this.loading = true;
    this.disabled = true;
    const user: User | undefined = this.users.find(
      (user) => user.username === this.form?.value['email']
    );
    this.authService.login(
      this.form?.value['email'],
      this.form?.value['password'],
      user
    );
  };
}
