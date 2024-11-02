import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signUpSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.signUpFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.signInSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.signInFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.signOutSuccess, state => ({ ...state, user: null })),
  on(AuthActions.signOutFailure, (state, { error }) => ({ ...state, error }))
);