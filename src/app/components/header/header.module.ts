import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RoutingModule } from '../../routes/routing.module';
import { MzNavbarModule } from 'ngx-materialize'

import { HeaderComponent } from "./header.component";

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RoutingModule,
        MzNavbarModule
    ],
    exports: [
        HeaderComponent
    ]
})

export class HeaderModule {}