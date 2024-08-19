import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() showRegistration = new EventEmitter<void>();

  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onShowRegistration() {
    this.showRegistration.emit();
  }

  onLogin() {
    this.authService.login(this.loginData).subscribe(
      response => {
        if (response && response.accessToken) {
          const userRole = this.authService.getUserRole();

          if (userRole === 'admin') {
            this.router.navigate(['/admin-dashboard']).then(() => {
              console.log('Navigation to /admin-dashboard successful');
            }).catch(err => {
              console.error('Navigation to /admin-dashboard failed', err);
            });
          } else {
            this.router.navigate(['/booking']).then(() => {
              console.log('Navigation to /booking successful');
            }).catch(err => {
              console.error('Navigation to /booking failed', err);
            });
          }
        }
      },
      error => {
        console.error('Login failed:', error);
        // Gestisci l'errore di login, ad esempio mostrando un messaggio all'utente
      }
    );
  }
}
