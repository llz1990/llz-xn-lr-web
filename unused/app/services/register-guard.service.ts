import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild} from '@angular/router';
import {RegisterService} from './register.service';

@Injectable()
export class RegisterGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router,
                private register: RegisterService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.doCheck(route, state);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.doCheck(route, state);
    }

    private doCheck(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        if (url === '/user/ca') {
            return true;
        }

        if (url === '/user/register2') {
            if (!this.register.checkStep(2)) {
                this.router.navigate(['/user/register']);
                return false;
            }

            return true;
        }

        if (url === '/user/register3') {
            if (!this.register.checkStep(3)) {
                this.router.navigate(['/user/register']);
                return false;
            }
            return true;
        }

        return true;
    }
}
