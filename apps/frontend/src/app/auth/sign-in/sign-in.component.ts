import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe({
        next: () => {
          alert('Login successful!');
          console.log('Navigating to product route...');
          this.router.navigate(['/products']).then(
            success => {
              if (success) {
                console.log('Navigation to product route succeeded.');
              } else {
                console.log('Navigation to product route failed.');
              }
            },
            error => {
              console.error('Navigation failed due to error:', error);
            }
          );
        },
        error: err => {
          console.error('Sign-in failed:', err);
          alert('Login failed');
        }
      });
    }
  }
}  