import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activation-success',
  standalone:false,
  templateUrl: './activation-success.component.html',
  styleUrl: './activation-success.component.css' 
})
export class ActivationSuccessComponent implements OnInit, OnDestroy {
  countdown: number = 10; // Countdown timer
  private intervalId: any; // Store the interval ID for cleanup

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Start the countdown
    this.intervalId = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(this.intervalId); // Stop the countdown
        this.router.navigate(['/login']); // Redirect to the login page
      }
    }, 1000); // Update the countdown every second
  }

  ngOnDestroy(): void {
    // Clean up the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}