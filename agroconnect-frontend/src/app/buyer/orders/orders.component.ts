import { OrderService } from '../../services/order.service';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buyer-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class BuyerOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrderHistory().subscribe((data: any) => this.orders = data);
  }

  getTotalSpent(): number {
    return this.orders.reduce((total, order) => total + (order.totalPrice || 0), 0);
  }
}
