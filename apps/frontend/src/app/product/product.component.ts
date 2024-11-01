import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Product Component Loaded');
    this.fetchProduct();
  }
  
  fetchProduct(): void {
    console.log('Fetching products...');
    this.http.get<any[]>('http://localhost:3000/api/products').subscribe(
      (response) => {
        console.log('Products Received:', response);
        this.product = response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }  
}  