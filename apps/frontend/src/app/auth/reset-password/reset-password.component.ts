import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword({ token: this.token, newPassword: this.resetPasswordForm.value.newPassword }).subscribe(
        response => {
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
          this.router.navigate(['/sign-in']);
        },
        () => {
          this.snackBar.open('Failed to reset password. Please try again.', 'Close', { duration: 3000 });
        }
      );
    }
  }
}