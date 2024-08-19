import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/api/users'; 

  constructor(private http: HttpClient) { }

  // Salva il token nel localStorage
  private saveToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  // Recupera il token dal localStorage
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Rimuove il token dal localStorage
  private removeToken(): void {
    localStorage.removeItem('accessToken');
  }

  // Metodo per ottenere i dettagli dell'utente dal server
  getUserDetails(): Observable<any> {
    const token = this.getToken();

    if (!token) {
      console.error('No token found');
      return of(null); // Return an observable with null or handle it appropriately
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Usa il token JWT qui
    });

    return this.http.get<any>(`${this.apiUrl}/me`, { headers }).pipe(
      map(response => {
        return response; // Contiene i dettagli dell'utente, inclusi ID e altre informazioni
      }),
      catchError(error => {
        console.error('Error fetching user details', error);
        return of(null); // Return an observable with null or handle it appropriately
      })
    );
  }


  // Recupera il ruolo dell'utente dal token
  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token); // Decodifica il token
      return decoded.role; // Assume che il ruolo sia memorizzato nel payload
    }
    return null;
  }
  // Metodo di login
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(response => {
          if (response.accessToken) {
            this.saveToken(response.accessToken);
          }
          return response;
        }),
        catchError(error => {
          console.error('Login error', error);
          return of(null);
        })
      );
  }

   // Metodo per la registrazione degli utenti
   register(userData: { username: string, email: string, password: string, role: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(error => {
        console.error('Registration error', error);
        return of(null); // Ritorna un observable con null o gestisci l'errore in modo appropriato
      })
    );
  }

  // Metodo di logout
  logout(): void {
    this.removeToken();
  }
}
