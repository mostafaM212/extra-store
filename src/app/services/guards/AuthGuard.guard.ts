import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<{ auth: { token: string } }>,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let isLoggedIn: boolean = false;

    this.store.select('auth').subscribe((data) => {
      isLoggedIn = data.token !== null;
    });

    return isLoggedIn ? true : this.router.createUrlTree(['login']);
  }
}
