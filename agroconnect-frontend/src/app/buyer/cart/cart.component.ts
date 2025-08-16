import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthStateService } from '../../services/auth-state.service';
import { take } from 'rxjs/operators';

interface CartItem {
  id: number;
  produceId: number;
  produceName: string;
  category: string;
  price: number;
  quantity: number;
  availableQuantity?: number;
  farmerName?: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-buyer-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class BuyerCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cart: CartItem[] = [];
  total: number = 0;
  loading = true;
  error = '';
  errorMessage = '';
  successMessage = '';
  isPlacingOrder = false;
  updatingItems = new Set<number>();
  quantities: { [key: number]: number } = {};

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authStateService: AuthStateService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.loading = true;
    this.error = '';

    this.cartService.getCartItems().subscribe({
      next: (data: any) => {
        console.log('🛒 Cart data received:', data);
        
        // Handle different possible data structures
        if (Array.isArray(data)) {
          this.cartItems = data.map(item => this.normalizeCartItem(item));
        } else if (data && data.cartItems) {
          this.cartItems = data.cartItems.map((item: any) => this.normalizeCartItem(item));
        } else {
          this.cartItems = [];
        }
        
        this.cart = this.cartItems;
        this.calculateTotal();
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading cart:', error);
        this.error = error.error?.message || 'Failed to load cart items.';
        this.loading = false;
      }
    });
  }

  private normalizeCartItem(item: any): CartItem {
    return {
      id: item.id || item.cartItemId,
      produceId: item.produceId || item.produce?.id,
      produceName: item.produceName || item.produce?.name || item.name || 'Unknown Product',
      category: item.category || item.produce?.category || 'Fresh from local farms',
      price: item.price || item.produce?.price || 0,
      quantity: item.quantity || 1,
      availableQuantity: item.availableQuantity || item.produce?.availableQuantity || 999,
      farmerName: item.farmerName || item.produce?.farmerName,
      imageUrl: item.imageUrl || item.produce?.imageUrl
    };
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }

    this.updatingItems.add(itemId);

    this.cartService.updateCartItem(itemId, quantity).subscribe({
      next: (response: any) => {
        this.cartItems = this.cartItems.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        );
        this.cart = this.cartItems;
        this.calculateTotal();
        this.updatingItems.delete(itemId);
      },
      error: (error: any) => {
        console.error('Error updating quantity:', error);
        this.errorMessage = error.error || 'Failed to update quantity.';
        this.updatingItems.delete(itemId);
        
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  updateQuantityImmediate(itemId: number, quantity: number): void {
    this.updateQuantity(itemId, quantity);
  }

  removeFromCart(itemId: number): void {
    this.updatingItems.add(itemId);

    this.cartService.deleteCartItem(itemId).subscribe({
      next: (response: any) => {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        this.cart = this.cartItems;
        this.calculateTotal();
        this.updatingItems.delete(itemId);
        this.successMessage = 'Item removed from cart successfully!';
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error: any) => {
        console.error('Error removing item:', error);
        this.errorMessage = error.error || 'Failed to remove item from cart.';
        this.updatingItems.delete(itemId);
        
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  removeItem(itemId: number): void {
    this.removeFromCart(itemId);
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: (response: any) => {
        this.cartItems = [];
        this.cart = [];
        this.calculateTotal();
        this.successMessage = 'Cart cleared successfully!';
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error: any) => {
        console.error('Error clearing cart:', error);
        this.errorMessage = error.error || 'Failed to clear cart.';
        
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  placeOrder(): void {
    this.isPlacingOrder = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.orderService.placeOrder().subscribe({
      next: (response: any) => {
        this.isPlacingOrder = false;
        this.successMessage = 'Order placed successfully!';
        this.cartItems = [];
        this.cart = [];
        this.calculateTotal();
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error: any) => {
        this.isPlacingOrder = false;
        console.error('Error placing order:', error);
        this.errorMessage = error.error || 'Failed to place order.';
        
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  getTotalPrice(): number {
    return this.total;
  }

  private calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }
}
