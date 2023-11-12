import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  productDetails: Product[] = [];

  constructor(private productService: ProductService, private imageProcessingService: ImageProcessingService,
    private router:Router) {}

  ngOnInit(): void {
    this.getAllProducts();
    // You can call your method here if you want it to be executed when the component is initialized.
    // this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts().pipe(
      map((x: Product[]) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    ).subscribe(
      (resp: Product[]) => {
        console.log(resp);
        this.productDetails = resp;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  showProductDetails(productId:any){
    this.router.navigate(['/productViewDetails',{productId:productId}])
  }
}
