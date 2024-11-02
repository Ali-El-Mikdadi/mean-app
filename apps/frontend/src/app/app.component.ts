import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setLogoutTimer(); // Set the automatic logout timer when the app is initialized
  }

  setLogoutTimer(): void {
    const tokenReceivedTime = localStorage.getItem('token_received_time');
    if (tokenReceivedTime) {
      const currentTime = new Date().getTime();
      const tenSecondsInMillis = 10 * 1000; // 10 seconds in milliseconds for testing
      // Change the above line to the following for 8 hours:
      // const eightHoursInMillis = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
      const timePassed = currentTime - parseInt(tokenReceivedTime, 10);
      const timeLeft = tenSecondsInMillis - timePassed;
  
      if (timeLeft > 0) {
        setTimeout(() => {
          this.authService.logout().subscribe();
        }, timeLeft);
      } else {
        this.authService.logout().subscribe();
      }
    }
  }
}