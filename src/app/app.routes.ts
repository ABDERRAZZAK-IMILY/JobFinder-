import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full'
  },
  {
    path: 'jobs',
    loadComponent: () => import('./features/jobs/jobs.component').then(m => m.JobsComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'favorites',
    canActivate: [authGuard],
    loadComponent: () => import('./features/favorites/favorites').then(m => m.FavoritesComponent)
  },
  {
    path: 'applications',
    loadComponent: () => import('./features/applications/applications').then(m => m.ApplicationsComponent),
    canActivate: [authGuard]
},
{ 
  path: 'profile', 
  loadComponent: () => import('./features/profile/profile').then(m => m.ProfileComponent),
  canActivate: [authGuard] 
}
];