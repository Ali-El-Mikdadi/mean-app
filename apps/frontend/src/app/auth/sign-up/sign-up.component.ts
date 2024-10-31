import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder) {
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
      console.log('Sign Up Data:', this.signUpForm.value);
    }
  }
}
