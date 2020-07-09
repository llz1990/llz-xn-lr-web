import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private user: UserService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.doCheck(route, state);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.doCheck(route, state);
    }

    private doCheck(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        // console.log('doCheck', url);
        if (url === '/user/login') {
            return true;
        }

        if (!this.user.isLogined()) {
            this.user.setRedirectUrl(url);
            this.router.navigate(['/user/login']);
            return false;
        } else {
            this.user.pushUrl(url);
            return true;
        }
    }
}
