import { createAction, props } from '@ngrx/store';

export const signUp = createAction('[Auth] Sign Up', props<{ name: string; email: string; password: string }>());
export const signUpSuccess = createAction('[Auth] Sign Up Success', props<{ user: any }>());
export const signUpFailure = createAction('[Auth] Sign Up Failure', props<{ error: any }>());

export const signIn = createAction('[Auth] Sign In', props<{ email: string; password: string }>());
export const signInSuccess = createAction('[Auth] Sign In Success', props<{ user: any }>());
export const signInFailure = createAction('[Auth] Sign In Failure', props<{ error: any }>());

export const signOut = createAction('[Auth] Sign Out');
export const signOutSuccess = createAction('[Auth] Sign Out Success');
export const signOutFailure = createAction('[Auth] Sign Out Failure', props<{ error: any }>());