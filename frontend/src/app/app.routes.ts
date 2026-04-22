import { Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/shared/components/login/login.component';
import { RegisterComponent } from './modules/auth/shared/components/register/register.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./modules/auth/shared/components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./modules/auth/shared/components/register/register.component').then(m => m.RegisterComponent)
    },

    {
        path: 'layout',
        loadChildren: () => import('./views/layout/layout.routes').then(m => m.layoutRoutes)
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
