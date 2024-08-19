// auth.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  showLoginForm = true; // Inizia con il modulo di login visualizzato
  showBooking = false; // Inizia con il modulo di prenotazione non visualizzato

  onShowLogin() {
    this.showLoginForm = true;
    this.showBooking = false;
  }

  onShowRegistration() {
    this.showLoginForm = false;
    this.showBooking = false; // Nascondi prenotazione
  }

  onShowBooking() {
    this.showLoginForm = false;
    this.showBooking = true; // Mostra prenotazione
  }
}
