import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { fadeInTrigger, buttonValidTrigger, routeSlideTrigger, bounceInTrigger } from './auth.animations';
import { LoginService } from './../../services/login.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    animations: [ fadeInTrigger, buttonValidTrigger, routeSlideTrigger, bounceInTrigger ]
})

export class AuthComponent implements OnDestroy {
    loginSubscription: Subscription;
    loggingIn: boolean = false;
    loginSuccess: boolean = false;
    loginError: boolean = false
    couldNotLogin: boolean = false;
    load: boolean = false;
    formAnimationState: string = 'startState';

    constructor(private loginService: LoginService,
                private router: Router,
                private authService: AuthService){
        let timer = setTimeout(() => {
            this.load = true;
            clearTimeout(timer)
        }, 300)
    }

    onLogin(loginForm: NgForm){
        this.isLoginSuccessFull()
        this.loginError = false;
        this.couldNotLogin = false;
        this.loggingIn = true;
        const { username, password } = loginForm.value.user;
        const data = { username, password };
        this.loginSubscription = this.loginService.login(data)
            .subscribe((res: any) => {
                this.loggingIn = false;
                this.loginSuccess = true;
                this.authService.saveAuthToken(res.token)
                    .then(() => {
                        let timer = setTimeout(() => {
                            this.formAnimationState = 'leaveState';
                            let timer2 = setTimeout(() => {
                                this.router.navigate(['/home'])
                                clearTimeout(timer2)
                            }, 500)
                            clearTimeout(timer)
                        }, 750)
                    })
        }, (err) => {
            console.log('err: ', err)
            if(err.statusText == 'Unknown Error' || err.status == 504){
                this.loggingIn = false;
                this.couldNotLogin = true;
                return
            }
            this.loggingIn = false;
            this.loginError = true;
        })    
    }

    isLoginSuccessFull(){
        setTimeout(() => {
            if(this.loginSuccess == false){
                this.loginSubscription.unsubscribe()
                this.loggingIn = false;
                this.loginError = false;
                this.couldNotLogin = true;
            }
        }, 10000);
    }

    ngOnDestroy(){
        if(this.loginSubscription) this.loginSubscription.unsubscribe()
    }

}