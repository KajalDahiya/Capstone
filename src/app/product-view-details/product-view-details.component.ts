import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{
String(arg0: number|undefined): string {
throw new Error('Method not implemented.');
}
  selectedProductIndex=0;
  product: Product | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private router:Router,
    private productService:ProductService){

  }
  ngOnInit(): void {
    this.product= this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }
  changeIndex(index: number){
    this.selectedProductIndex=index;
  }

  addToCart(productId: string) {
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
      }, (error)=> {
        console.log(error);
      }
    );
  }
  buyProduct(productId: any){
this.router.navigate(['/buyProduct',{
  isSingleProductCheckout:true,id:productId
}]);
  }
}
