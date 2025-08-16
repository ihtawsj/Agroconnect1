import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produce-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './produce-upload.component.html',
  styleUrls: ['./produce-upload.component.css']
})
export class ProduceUploadComponent implements OnInit {
  produce = {
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    description: ''
  };
  
  selectedFile: File | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';
  
  categories = [
    { value: 'vegetables', label: '🥬 Vegetables' },
    { value: 'fruits', label: '🍎 Fruits' },
    { value: 'meat', label: '🥩 Meat' },
    { value: 'dairy', label: '🥛 Dairy' },
    { value: 'other', label: '📦 Other' }
  ];

  private previewUrl: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Please select an image file.';
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'Image size should be less than 5MB.';
        return;
      }
      
      // Revoke previous preview URL if any
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl);
      }
      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);
      this.errorMessage = '';
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image for the produce.';
      return;
    }

    if (!this.produce.name || !this.produce.category || this.produce.quantity <= 0 || this.produce.price <= 0) {
      this.errorMessage = 'Please fill in all required fields with valid values.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('name', this.produce.name);
    formData.append('category', this.produce.category);
    formData.append('quantity', this.produce.quantity.toString());
    formData.append('price', this.produce.price.toString());
    formData.append('description', this.produce.description);
    formData.append('image', this.selectedFile);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:8080/farmer/produce/add', formData, { headers })
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.successMessage = '✅ Produce uploaded successfully!';
          this.resetForm();
          
          // Redirect to view produce after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/farmer/view-produce']);
          }, 2000);
        },
        error: (error: any) => {
          this.loading = false;
          console.error('Upload error:', error);
          this.errorMessage = error.error?.message || '❌ Failed to upload produce. Please try again.';
        }
      });
  }

  resetForm(): void {
    this.produce = {
      name: '',
      category: '',
      quantity: 0,
      price: 0,
      description: ''
    };
    this.selectedFile = null;
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = '';
    }
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  getImagePreviewUrl(): string {
    return this.previewUrl;
  }

  getFileSize(): string {
    if (this.selectedFile) {
      return (this.selectedFile.size / 1024 / 1024).toFixed(2);
    }
    return '0';
  }

  goBack(): void {
    this.router.navigate(['/farmer']);
  }
}
