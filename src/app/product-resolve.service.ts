// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
// import { Product } from './_model/product.model';
// import { Observable, of } from 'rxjs';

// import { ProductService } from './_services/product.service';
// import { ImageProcessingService } from './image-processing.service';
// import { catchError, map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductResolveService implements Resolve<Product>{

//   constructor(
//     private productService: ProductService,
//     private imageProcessingService: ImageProcessingService
//   ) { }

//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<Product> {
//     const id = route.paramMap.get("productId");

//     if (id) {
//       return this.productService.getProductDetailsById(id).pipe(
//         map(p => this.imageProcessingService.createImages(p)),
//         catchError(error => {
//           // Handle error if necessary
//           console.error(error);
//           return of(null); // or return a default product or handle the error in a different way
//         })
//       );
//     } else {
//       // Return a default product or handle the case where there's no id
//       return of(this.getProductDetails());
//     }
//   }

//   getProductDetails(): Product {
//     return {
//       productName: "",
//       productDescription: "",
//       productDiscountedPrice: 0,
//       productActualPrice: 0,
//       productImages: [],
//     };
//   }
// }

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { Observable, of } from 'rxjs';

import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const id = route.paramMap.get("productId");

    if (id) {
      return this.productService.getProductDetailsById(id).pipe(
        map(p => this.imageProcessingService.createImages(p)),
        catchError(error => {
          console.error(error);
          // Instead of returning null, you can return a default product or rethrow the error
          // return of(this.getDefaultProduct());
          throw new Error('Error fetching product details');
        })
      );
    } else {
      return of(this.getProductDetails());
    }
  }

  getProductDetails(): Product {
    return {
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: [],
    };
  }
}
