import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<{ message: string, type: string } | null>();
  notifications$ = this.notificationSubject.asObservable();

  showNotification(message: string, type: string) {
    this.notificationSubject.next({ message, type });
    setTimeout(() => {
      this.notificationSubject.next(null); // Clear notification after a few seconds
    }, 3000);
  }
}
