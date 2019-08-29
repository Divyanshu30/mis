import { LoginService } from './../../services/login.service';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { MzButtonModule, MzInputModule } from 'ngx-materialize'

import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        MzButtonModule, 
        MzInputModule
    ],
    exports: [
        AuthComponent
    ],
    providers: [
        LoginService
    ]
})

export class AuthModule {}