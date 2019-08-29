import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { tap, finalize } from 'rxjs/operators';
import { ModalHelperService } from './../services/modal-helper.service';

@Injectable()
export class AppInterceptorService implements HttpInterceptor {
    constructor(private router: Router,
                private modaslHelperService: ModalHelperService,
                private activatedRoute: ActivatedRoute) {}

    copiedReq: any;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let accessToken = localStorage.getItem('authorizationToken');
        
        if(accessToken){
            this.copiedReq = req.clone({
                headers: new HttpHeaders({
                  Authorization: `Bearer ${accessToken}`
                })
            });
        } else {
            this.copiedReq = req.clone()
        }
        return next.handle(this.copiedReq).pipe(tap((response) => {
            console.log(response)
        }, err => {
            // console.log(err)
           if(err.status == 403) {
               setTimeout(() => {
                this.modaslHelperService.closeModal.emit()
                setTimeout(() => {
                     this.router.navigate(['/sessionexpired'])        
                }, 750);
               }, 750);
           }
        }))
    } 

}