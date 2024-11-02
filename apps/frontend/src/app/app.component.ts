import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showSignIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setLogoutTimer(); // Set the automatic logout timer when the app is initialized
  }

  toggleView() {
    this.showSignIn = !this.showSignIn;
  }

  setLogoutTimer(): void {
    const tokenReceivedTime = localStorage.getItem('token_received_time');
    if (tokenReceivedTime) {
      const currentTime = new Date().getTime();
      const eightHoursInMillis = 10 * 1000; // 10 seconds in milliseconds expiry for testing faster
      //const eightHoursInMillis = 8 * 60 * 10 * 1000; // 8 hours in milliseconds expiry
      const timePassed = currentTime - parseInt(tokenReceivedTime, 10);
      const timeLeft = eightHoursInMillis - timePassed;

      if (timeLeft > 0) {
        setTimeout(() => {
          this.authService.logout();
        }, timeLeft);
      } else {
        this.authService.logout();
      }
    }
  }
}
