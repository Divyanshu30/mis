import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient,
                private apiService: ApiService){}

    login(data) {
        const url = this.apiService.createUrl('login')
        return this.http.post(url, data)
    }

}