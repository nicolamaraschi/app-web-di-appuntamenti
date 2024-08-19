import { Component } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
 reservations: any[] = [];
  bookingData = {
    date: '',
    timeSlot: '',
    details: ''
  };

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.bookingService.getMyReservations().subscribe(reservations => {
      this.reservations = reservations || [];
    });
  }
  
  onBook() {
    const { date, timeSlot, details } = this.bookingData;

    this.bookingService.book(date, timeSlot, details).subscribe(
      response => {
        console.log('Booking successful:', response);
        // Redirect or show success message
      },
      error => {
        console.error('Booking error:', error);
      }
    );
  }
}
