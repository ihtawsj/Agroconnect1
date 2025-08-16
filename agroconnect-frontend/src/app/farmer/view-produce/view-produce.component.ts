import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FarmerService } from '../../services/farmer.service';
import { CommonModule } from '@angular/common';

interface Produce {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  description?: string;
  imageUrl?: string;
  createdAt?: string;
}

@Component({
  selector: 'app-view-produce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-produce.component.html',
  styleUrls: ['./view-produce.component.css']
})
export class ViewProduceComponent implements OnInit {
  produceList: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  deletingItems = new Set<number>();

  // Hardcoded demo items with negative IDs to avoid conflicts
  demoProduce: any[] = [
    {
      id: -1,
      name: 'Demo Corn',
      category: 'Vegetables',
      quantity: 5,
      price: 20,
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: -2,
      name: 'Demo Carrot',
      category: 'Vegetables',
      quantity: 10,
      price: 15,
      imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: -3,
      name: 'Demo Apple',
      category: 'Fruits',
      quantity: 8,
      price: 30,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg'
    }
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private farmerService: FarmerService
  ) { }

  ngOnInit(): void {
    this.loadProduce();
  }

  loadProduce(): void {
    this.loading = true;
    this.errorMessage = '';

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.farmerService.getMyProduce().subscribe({
      next: (data: any[]) => {
        // Combine backend data and hardcoded demo items
        this.produceList = [...this.demoProduce, ...data];
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching produce:', err);
        this.errorMessage = 'Failed to load produce. Please try again.';
        // Still show demo items if backend fails
        this.produceList = [...this.demoProduce];
        this.loading = false;
      }
    });
  }

  deleteProduce(id: number): void {
    // If it's a demo item (negative ID), just remove it from the lists
    if (id < 0) {
      this.produceList = this.produceList.filter(item => item.id !== id);
      this.demoProduce = this.demoProduce.filter(item => item.id !== id);
      this.successMessage = 'Demo produce deleted successfully!';
      setTimeout(() => this.successMessage = '', 3000);
      return;
    }
    // Otherwise, call backend for real items
    this.farmerService.deleteProduce(id).subscribe({
      next: () => {
        this.produceList = this.produceList.filter(item => item.id !== id);
        this.successMessage = 'Produce deleted successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err: any) => {
        console.error('Error deleting produce:', err);
        this.errorMessage = 'Produce deleted , Refresh for update';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'vegetables': '🥬',
      'fruits': '🍎',
      'meat': '🥩',
      'dairy': '🥛',
      'other': '📦'
    };
    return icons[category] || '📦';
  }

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      'vegetables': 'Vegetables',
      'fruits': 'Fruits',
      'meat': 'Meat',
      'dairy': 'Dairy',
      'other': 'Other'
    };
    return labels[category] || 'Other';
  }

  goBack(): void {
    this.router.navigate(['/farmer']);
  }

  goToUpload(): void {
    this.router.navigate(['/farmer/upload-produce']);
  }

  getTotalValue(): number {
    return this.produceList.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  refreshProduce() {
    this.loadProduce();
  }

  getImageUrl(url: string | undefined | null): string {
    if (!url) return 'assets/default-produce.png';
    // If already a full URL, return as is
    if (url.startsWith('http')) return url;
    // Otherwise, prepend backend URL
    return 'http://localhost:8080' + url;
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/default-produce.png';
  }
}
