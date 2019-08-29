import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: `
        <h5 class="session-expired">
            Sorry. Your session has expired. Redirecting to login page...
        </h5>
    `,
   styles: [`
               .session-expired { 
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%)
            }
        `
   ]
})

export class SessionExpiredComponent implements OnInit {
    constructor(private router: Router){}
    ngOnInit(){
        const token = localStorage.getItem('authorizationToken')
        if(token){
            localStorage.removeItem('authorizationToken')
            setTimeout(() => {
                this.router.navigate(['/'])
            }, 2500);
        } else {
            this.router.navigate(['/'])
        }
    }

}