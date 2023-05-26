import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  logInForm: FormGroup = {} as FormGroup;
  username = 'string';
  password = 'string';
  private popStateSubscription?: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.logInForm = this._formBuilder.group({
      email: ['aa@gmail.com', [Validators.required, Validators.email]],
      password: ['qweqwe', [Validators.required, Validators.minLength(6)]],
    });

    this.popStateSubscription = this._router.events.subscribe(event => {
      if (event instanceof PopStateEvent && this.authService.isLoggedIn()) {
        this._router.navigate(['/simulator']);
      }
    });
  }

  ngOnDestroy(): void {
    this.popStateSubscription?.unsubscribe();
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        console.log('Usuario logueado con éxito');
        this._router.navigate(['/simulator']);
      },
      err => console.error('Error en el inicio de sesión', err)
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
