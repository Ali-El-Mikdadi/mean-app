import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../store/auth.reducer';
import * as AuthActions from '../store/auth.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
    private router: Router,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private actions$: Actions // Inject Actions
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    // Listen for signUpSuccess action and navigate to sign-in page
    this.actions$.pipe(
      ofType(AuthActions.signUpSuccess),
      filter(() => this.signUpForm.valid)
    ).subscribe(() => {
      this.router.navigate(['/sign-in']);
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const { name, email, password } = this.signUpForm.value;
      this.store.dispatch(AuthActions.signUp({ name, email, password }));
    }
  }
}