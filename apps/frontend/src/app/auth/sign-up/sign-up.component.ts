import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  toggleVisibility() {
    this.hide = !this.hide;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log('Submitting Sign Up Form:', this.signUpForm.value); // Log before making service call
      this.authService.signUp(this.signUpForm.value).subscribe({
        next: (response) => {
          console.log('SignUp Successful:', response); // Log if sign up is successful
          alert('Sign Up Successful!');
        },
        error: (error) => {
          console.error('SignUp Failed:', error); // Log if sign up fails
          alert('Sign Up Failed');
        }
      });
    } else {
      console.log('Sign Up Form is invalid:', this.signUpForm); // Log invalid form details
    }
  }  
}