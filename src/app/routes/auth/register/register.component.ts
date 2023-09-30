import { NgForm } from '@angular/forms';
import { countryList } from './../../../helpers/Counteries';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService.service';
import { User } from 'src/app/models/User.model';
import { Subject, finalize, takeUntil, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  userPlus = faUserPlus;
  countries: string[] = countryList;
  isLoading = false;
  @ViewChild('form') form: NgForm | undefined;
  constructor(
    private authService: AuthService,
    private tostr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmitHandler = () => {
    if (this.form?.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService
      .register(this.form?.value)
      .pipe(
        tap((data) => {
          console.log('test', data);

          this.tostr.success('user created successfully', 'Register Success');
          this.router.navigate(['/login']);
        }),
        takeUntil(this._unsubscribe$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  };

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
