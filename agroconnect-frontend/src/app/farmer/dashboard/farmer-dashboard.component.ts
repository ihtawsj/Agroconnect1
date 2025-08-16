import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './farmer-dashboard.component.html',
  styleUrls: ['./farmer-dashboard.component.css']
})
export class FarmerDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToUpload(): void {
    this.router.navigate(['/farmer/upload-produce']);
  }

  navigateToViewProduce(): void {
    this.router.navigate(['/farmer/view-produce']);
  }

  navigateToOrders(): void {
    this.router.navigate(['/farmer/orders']);
  }
}
