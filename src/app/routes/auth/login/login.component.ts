import { Router } from '@angular/router';
import { User } from './../../../models/User.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AuthService } from 'src/app/services/AuthService.service';
import { Subject, finalize, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
export class LoginComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  user = faUser;
  @ViewChild('form') form: NgForm | undefined;
  animationState: string = 'with';
  users: User[] = [];
  disabled: boolean = false;
  error: string = '';
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
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
  }

  onSubmitHandler = () => {
    if (this.form?.invalid) {
      return;
    }
    this.isLoading = true;

    this.authService
      .login(this.form?.value)
      .pipe(
        tap((data) => {
          this.authService.saveUserDataToLocalStorage(data);
          this.authService.isAuthenticated$.next(true);
          this.authService.user$.next(data.user);
          this.authService.token$.next(data.token);
          this.toastr.success('login Successfully', 'Success');
          this.router.navigate(['']);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  };
  ngOnDestroy(): void {
    this._unsubscribe$.next(false);
    this._unsubscribe$.complete();
  }
}
