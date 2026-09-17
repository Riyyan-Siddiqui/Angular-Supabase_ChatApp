import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {
        path: 'chat',
        canActivate: [authGuard],
        loadComponent() {
            return import('./pages/chat/chat').then((m) => m.Chat);
        }
    },
    {
        path: 'login',
        loadComponent() {
            return import('./pages/login/login').then((m) => m.Login);
        }
    },
    {
        path: '',
        loadComponent() {
            return import('./pages/login/login').then((m) => m.Login);
        }
    },
];
