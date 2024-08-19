import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookingComponent } from './booking/booking.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { BookingService } from './booking.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NotificationComponent } from './notification/notification.component'; // Importa il componente di notifica
import { CommonModule } from '@angular/common'; // Importa CommonModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BookingComponent,
    NavbarComponent,
    AdminDashboardComponent,
    NotificationComponent // Aggiungi il componente di notifica qui
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [AuthService, BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
