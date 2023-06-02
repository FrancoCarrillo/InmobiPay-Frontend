import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SavedLoanComponent } from './pages/main/saved-loan/saved-loan.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MainComponent } from './pages/main/main.component';
import { RedirectIfAuthenticatedGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectIfAuthenticatedGuard]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'simulator', pathMatch: 'full' },
      { path: 'simulator', component: MainComponent },
      { path: 'saved-loan', component: SavedLoanComponent },
    ]
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
