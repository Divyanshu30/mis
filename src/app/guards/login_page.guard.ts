import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginPageGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router){}
    
    canActivate(): Observable<boolean>  | Promise<boolean> | boolean {
        const isAuthenticated = this.authService.isAuthenticated()
        if(isAuthenticated){
            this.router.navigate(['/home'])
        } else {
            return true
        }
    }
}