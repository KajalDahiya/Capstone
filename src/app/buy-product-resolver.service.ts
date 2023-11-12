import { Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProductService } from './_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService  implements Resolve<Product[]>{
  imageProcessingService: any;

  constructor(private productService:ProductService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Product[]|Observable<Product[]>|
  Promise<Product[]>{
    const id=route.paramMap.get("id");
    const isSingleProductCheckout=route.paramMap.get("isSingleProductCheckout");
    return this.productService.getProductDetails(isSingleProductCheckout,id)
    .pipe(
      map(
        (x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product))
      )
    );
  }



}
