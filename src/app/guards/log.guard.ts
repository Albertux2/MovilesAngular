import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from '../service/UserAuthentication.service';

@Injectable({
  providedIn: 'root',
})
export class LogGuard implements CanActivate {
  constructor(
    private userService: UserAuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.userService.isLogged) {
      alert('Debe iniciar sesión para acceder a esta página');
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
