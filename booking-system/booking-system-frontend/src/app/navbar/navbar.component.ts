import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() showLogin = new EventEmitter<void>();
  @Output() showRegistration = new EventEmitter<void>();
  @Output() showBooking = new EventEmitter<void>();

  isLoggedIn: boolean = false;

  constructor() {
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  onShowLogin() {
    this.showLogin.emit();
  }

  onShowRegistration() {
    this.showRegistration.emit();
  }

  onShowBooking() {
    this.showBooking.emit();
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.showLogin.emit(); // Torna alla schermata di login
  }
}
