import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() showLogin = new EventEmitter<void>();

  registrationData = {
    username: '',  
    email: '',
    password: '',
    role: 'user'
  };
  

  constructor(private authService: AuthService) {}

  onShowLogin() {
    this.showLogin.emit();
  }

  onRegister() {
    this.authService.register(this.registrationData).subscribe(
      response => {
        console.log('Registration successful:', response);
        this.onShowLogin(); // Vai alla schermata di login
      },
      error => {
        console.error('Registration failed:', error);
      }
    );
  }
}
