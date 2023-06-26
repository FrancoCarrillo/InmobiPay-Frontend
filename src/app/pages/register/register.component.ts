import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RegisterDto } from 'src/app/core/models/dto/RegisterDto';
import { RegisterService } from './../../core/services/register/register.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = {} as FormGroup;

  User: RegisterDto = new RegisterDto('', '', '', '', 0, '', '');

  hide = true;

  constructor(
    private _router: Router,
    private _registerService: RegisterService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      names: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z ]*$'),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(18),
        Validators.pattern('^[0-9]*$'),
      ]),
      dni: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]*$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      lastNames: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z ]*$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get username() {
    return this.registerForm.get('username');
  }
  get names() {
    return this.registerForm.get('names');
  }
  get lastNames() {
    return this.registerForm.get('lastNames');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get age() {
    return this.registerForm.get('age');
  }
  get dni() {
    return this.registerForm.get('dni');
  }
  get password() {
    return this.registerForm.get('password');
  }

  registerUser(): void {
    this.User.username = this.registerForm.get('username')?.value;
    this.User.names = this.registerForm.get('names')?.value;
    this.User.lastNames = this.registerForm.get('lastNames')?.value;
    this.User.email = this.registerForm.get('email')?.value;
    this.User.age = this.registerForm.get('age')?.value;
    this.User.dni = this.registerForm.get('dni')?.value;
    this.User.password = this.registerForm.get('password')?.value;

    if (this.registerForm.status == 'VALID') {
      this._registerService.register(this.User).subscribe(
        (data) => {
          this._snackBar.open(data.message, 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
          this._router.navigate(['/login']);
        },
        (error) => {
          this._snackBar.open(error.error.message, 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        }
      );
    }
  }
}
