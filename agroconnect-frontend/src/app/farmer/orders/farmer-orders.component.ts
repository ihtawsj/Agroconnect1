import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FarmerService } from '../../services/farmer.service';
import { Router } from '@angular/router';

interface Order {
  id: number;
  produceName?: string;
  buyerName?: string;
  quantity?: number;
  totalPrice?: number;
  orderDate?: string;
  status?: string;
}

@Component({
  selector: 'app-farmer-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './farmer-orders.component.html',
  styleUrls: ['./farmer-orders.component.css']
})
export class FarmerOrdersComponent implements OnInit {

  orders: Order[] = [];
  loading = true;
  errorMessage = '';
  successMessage = '';
  
  filters = {
    produceName: '',
    buyerName: '',
    fromDate: '',
    toDate: ''
  };

  constructor(
    private farmerService: FarmerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.farmerService.getFarmerOrders(this.filters).subscribe({
      next: (data: Order[]) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Failed to fetch orders:', err);
        this.errorMessage = '❌ Could not load orders. Please try again.';
        this.loading = false;
      }
    });
  }

  clearFilters(): void {
    this.filters = {
      produceName: '',
      buyerName: '',
      fromDate: '',
      toDate: ''
    };
    this.getOrders();
  }

  hasActiveFilters(): boolean {
    return !!(this.filters.produceName || this.filters.buyerName || this.filters.fromDate || this.filters.toDate);
  }

  getStatusBadgeClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'PENDING': 'bg-warning',
      'CONFIRMED': 'bg-info',
      'SHIPPED': 'bg-primary',
      'DELIVERED': 'bg-success',
      'CANCELLED': 'bg-danger'
    };
    return statusClasses[status] || 'bg-secondary';
  }

  getStatusIcon(status: string): string {
    const statusIcons: { [key: string]: string } = {
      'PENDING': 'fas fa-clock',
      'CONFIRMED': 'fas fa-check',
      'SHIPPED': 'fas fa-shipping-fast',
      'DELIVERED': 'fas fa-check-double',
      'CANCELLED': 'fas fa-times'
    };
    return statusIcons[status] || 'fas fa-question';
  }

  getTotalRevenue(): number {
    return this.orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  }

  goBack(): void {
    this.router.navigate(['/farmer']);
  }
}
