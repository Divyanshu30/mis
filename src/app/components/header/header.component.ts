import { DataStoreService } from './../../services/data-store.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    constructor(public authService: AuthService,
                private router: Router,
                private dataStoreService: DataStoreService){}

    onLogout(){
        this.authService.removeAuthToken()
            .then(() => {
                let timer = setTimeout(() => {
                    this.dataStoreService.misData = null;
                    this.router.navigate(['/login'])
                    clearTimeout(timer)
                }, 500)
            })
    }
}