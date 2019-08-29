import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from '../components/auth/auth.component';
import { MisDataComponent } from './../components/mis/mis-data/mis-data.component';
import { AddMisDataComponent } from './../components/mis/add-mis-data/add-mis-data.component';
import { SessionExpiredComponent } from './../components/session-expired/session-expired.component';

import { AuthGuard } from '../guards/auth.guard';
import { LoginPageGuard } from '../guards/login_page.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: '/mis/data', pathMatch: 'full' },
    { path: 'login', component: AuthComponent, canActivate: [LoginPageGuard] },
    { path: 'mis', canActivate: [AuthGuard], children: [
        { path: 'data', component: MisDataComponent },
        { path: 'add', component: AddMisDataComponent },
        { path: 'edit/:id', component: AddMisDataComponent },
        { path: '', redirectTo: '/mis/data', pathMatch: 'full' }
    ]},
    { path: 'sessionexpired', component: SessionExpiredComponent },
    { path: '**', redirectTo: '/mis/data' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class RoutingModule {}