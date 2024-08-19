import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5001/api/reservations'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Prenota utilizzando i dettagli dell'utente ottenuti dal servizio di autenticazione
  book(date: string, timeSlot: string, details: string): Observable<any> {
    // Recupera i dettagli dell'utente
    return this.authService.getUserDetails().pipe(
      switchMap(userDetails => {
        if (!userDetails || !userDetails._id) {
          console.error('User details or ID not found');
          return of(null); // Return an observable with null or handle it appropriately
        }

        // Recupera il token JWT dal servizio di autenticazione
        const token = this.authService.getToken();

        if (!token) {
          console.error('No token found');
          return of(null); // Return an observable with null or handle it appropriately
        }

        // Crea le intestazioni con il token
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Usa il token JWT qui
        });

        // Crea i dati di prenotazione con l'ID utente
        const bookingData = { userId: userDetails._id, date, timeSlot, details };

        // Esegui la richiesta di prenotazione
        return this.http.post<any>(this.apiUrl, bookingData, { headers }).pipe(
          catchError(error => {
            console.error('Booking error', error);
            return of(null); // Return an observable with null or handle it appropriately
          })
        );
      })
    );
  }

  getMyReservations(): Observable<any[]> {
    const token = this.authService.getToken();

    if (!token) {
      console.error('No token found');
      return of([]); // Return an empty observable array or handle it appropriately
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/my-reservations`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching reservations', error);
        return of([]); // Return an empty observable array or handle it appropriately
      })
    );
  }

}
