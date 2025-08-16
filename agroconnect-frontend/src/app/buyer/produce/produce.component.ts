import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProduceService } from '../../services/produce.service';
import { CartService } from '../../services/cart.service';
import { AuthStateService } from '../../services/auth-state.service';
import { take } from 'rxjs/operators';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-buyer-produce',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './produce.component.html',
  styleUrls: ['./produce.component.css']
})
export class BuyerProduceComponent implements OnInit, OnDestroy {
  produceList: any[] = [];
  filteredProduceList: any[] = [];
  selectedCategory: string = '';
  sortBy: string = '';
  loading = true;
  error = '';
  errorMessage = '';
  successMessage = '';
  isAddingToCart = false;
  quantities: { [key: number]: number } = {};
  private quantityUpdateSubject = new Subject<{produceId: number, quantity: number}>();
  private destroy$ = new Subject<void>();

  constructor(
    private produceService: ProduceService,
    private cartService: CartService,
    public authStateService: AuthStateService
  ) {}

  ngOnInit(): void {
    this.loadProduce();
    this.setupQuantityUpdates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isLoggedIn(): boolean {
    return this.authStateService.isLoggedIn();
  }

  loadProduce(): void {
    this.loading = true;
    this.error = '';

    this.produceService.getAllProduce().subscribe({
      next: (res: any) => {
        this.produceList = res || [];
        this.filteredProduceList = [...this.produceList];
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading produce:', err);
        this.error = err.error?.message || 'Failed to load produce.';
        this.loading = false;
      }
    });
  }

  setupQuantityUpdates(): void {
    this.quantityUpdateSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(({ produceId, quantity }) => {
      this.quantities[produceId] = quantity;
    });
  }

  onQuantityChange(produceId: number, quantity: number): void {
    this.quantityUpdateSubject.next({ produceId, quantity });
  }

  addToCart(produceId: number): void {
    const quantity = this.quantities[produceId] || 1;
    
    if (quantity <= 0) {
      this.errorMessage = 'Quantity must be greater than 0';
      return;
    }

    this.isAddingToCart = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.cartService.addToCart(produceId, quantity).subscribe({
      next: (response: any) => {
        this.isAddingToCart = false;
        this.successMessage = '✅ Added to cart successfully!';
        this.quantities[produceId] = 1; // Reset quantity
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error: any) => {
        this.isAddingToCart = false;
        console.error('Error adding to cart:', error);
        this.errorMessage = error.error || '❌ Failed to add to cart.';
        
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.produceList];

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(item => 
        item.category?.toLowerCase().includes(this.selectedCategory.toLowerCase())
      );
    }

    // Sort
    if (this.sortBy) {
      filtered.sort((a, b) => {
        switch (this.sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'quantity-asc':
            return a.quantity - b.quantity;
          case 'quantity-desc':
            return b.quantity - a.quantity;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }

    this.filteredProduceList = filtered;
  }

  hasActiveFilters(): boolean {
    return !!(this.selectedCategory || this.sortBy);
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.sortBy = '';
    this.filteredProduceList = [...this.produceList];
  }

  getSortDisplayName(): string {
    if (!this.sortBy) return '';
    
    const displayName = this.sortBy
      .replace('-', ' ')
      .replace(/\b\w/g, (l: string) => l.toUpperCase());
    
    return displayName;
  }

  trackByProduceId(index: number, item: any): number {
    return item.id;
  }

  shouldShowValidation(produceId: number): boolean {
    const quantity = this.quantities[produceId];
    const item = this.produceList.find(p => p.id === produceId);
    return quantity !== undefined && (quantity <= 0 || quantity > (item?.quantity || 0));
  }
}
