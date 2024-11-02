import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  signUp$;
  signIn$;
  signOut$;

  constructor(private actions$: Actions, private authService: AuthService) {
    this.signUp$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.signUp),
        mergeMap(({ name, email, password }) =>
          this.authService.signUp({ name, email, password }).pipe(
            map(user => AuthActions.signUpSuccess({ user })),
            catchError(error => of(AuthActions.signUpFailure({ error })))
          )
        )
      )
    );

    this.signIn$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.signIn),
        mergeMap(({ email, password }) =>
          this.authService.signIn({ email, password }).pipe(
            map(user => AuthActions.signInSuccess({ user })),
            catchError(error => of(AuthActions.signInFailure({ error })))
          )
        )
      )
    );

    this.signOut$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.signOut),
        mergeMap(() =>
          this.authService.logout().pipe(
            map(() => AuthActions.signOutSuccess()),
            catchError(error => of(AuthActions.signOutFailure({ error })))
          )
        )
      )
    );
  }
}