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
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
    private router: Router,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private actions$: Actions // Inject Actions
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // Listen for signInSuccess action and navigate to product page
    this.actions$.pipe(
      ofType(AuthActions.signInSuccess),
      filter(() => this.signInForm.valid)
    ).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.store.dispatch(AuthActions.signIn({ email, password }));
    }
  }
}