import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success'; // Tipo di notifica (successo o errore)
  show: boolean = false;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    if (this.message) {
      this.show = true;
      timer(3000).pipe(takeUntil(this.destroy$)).subscribe(() => this.show = false);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
