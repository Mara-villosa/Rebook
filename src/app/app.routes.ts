import { Routes } from '@angular/router';
import { Home } from './home/home';
import { authGuard } from './shared/guards/auth-guard/auth-guard';
import { SignUp } from './authentication/sign-up/sign-up';
import { LogIn } from './authentication/log-in/log-in';

export const routes: Routes = [
    {path: 'auth/login', component: LogIn},
    {path: 'auth/signup', component: SignUp},
    {path: 'home', component: Home, canActivate: [authGuard]},
    {path: '**', redirectTo: 'home'},
];
