import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Product Component Loaded');
    this.fetchProducts();
  }
  
  fetchProducts(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<any[]>(`${environment.apiUrl}/products`, { headers }).subscribe(
        (response) => {
          this.products = response;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      console.error('No token found, user might not be logged in.');
    }
  }  
}