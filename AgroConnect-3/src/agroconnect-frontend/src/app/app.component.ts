import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // ✅ Import this!

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet // ✅ Add this to fix the error
  ]
})
export class AppComponent {
  title = 'agroconnect-frontend';
}
