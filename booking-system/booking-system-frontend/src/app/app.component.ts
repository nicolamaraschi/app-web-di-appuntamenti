import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service'; // Import the NotificationService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router: Router) {}

  navigateTo(view: string) {
    this.router.navigate([view]);
  }
  title = 'booking-system-frontend'; // Aggiungi questa linea
}

