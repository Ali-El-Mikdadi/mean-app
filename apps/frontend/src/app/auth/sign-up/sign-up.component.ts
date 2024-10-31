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
      this.authService.signUp(this.signUpForm.value).subscribe({
        next: () => {
          alert('Sign-up successful! Please log in.');
          this.router.navigate(['/sign-in']);
        },
        error: err => alert('Sign-up failed. Please try again.')
      });
    }
  }
}