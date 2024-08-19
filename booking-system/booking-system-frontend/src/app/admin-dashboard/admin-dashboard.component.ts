import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  reservations: any[] = [];
  userReservations: any[] = [];
  dateReservations: any[] = [];
  rangeReservations: any[] = [];
  errorMessage: string = '';
  userId: string = '';
  date: string = '';
  startDate: string = '';
  endDate: string = '';

  private apiUrl = 'http://localhost:5001/api/reservations'; // Base URL for API

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadAllReservations();
  }

  // Load all reservations
  loadAllReservations() {
    const token = this.authService.getToken();
    this.http.get<any[]>(this.apiUrl, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe(
      data => this.reservations = data,
      error => this.errorMessage = 'Failed to load reservations'
    );
  }

  // Load user reservations
  loadUserReservations() {
    const token = this.authService.getToken();
    this.http.get<any[]>(`${this.apiUrl}/user/${this.userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe(
      data => this.userReservations = data,
      error => this.errorMessage = 'Failed to load user reservations'
    );
  }

  // Load reservations by date
  loadDateReservations() {
    const token = this.authService.getToken();
    this.http.get<any[]>(`${this.apiUrl}/date/${this.date}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe(
      data => this.dateReservations = data,
      error => this.errorMessage = 'Failed to load date reservations'
    );
  }

  // Load reservations by date range
  loadRangeReservations() {
    const token = this.authService.getToken();
    this.http.get<any[]>(`${this.apiUrl}/date-range?startDate=${this.startDate}&endDate=${this.endDate}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe(
      data => this.rangeReservations = data,
      error => this.errorMessage = 'Failed to load range reservations'
    );
  }

  // Update reservation status
  updateStatus(reservationId: string, status: string) {
    const token = this.authService.getToken();
    this.http.put<any>(`${this.apiUrl}/${reservationId}/status`, { status }, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe(
      data => {
        // Ricarica le prenotazioni per riflettere le modifiche
        this.loadAllReservations();
        alert('Status updated successfully');
      },
      error => this.errorMessage = 'Failed to update status'
    );
  }
}
