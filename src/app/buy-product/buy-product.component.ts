// import { Component, OnInit } from '@angular/core';
// import { OrderDetails } from '../_model/order-details.model';
// import { NgForm } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../_services/product.service';

// @Component({
//   selector: 'app-buy-product',
//   templateUrl: './buy-product.component.html',
//   styleUrls: ['./buy-product.component.css']
// })
// export class BuyProductComponent  implements OnInit{

//   productDetails:Product[]=[];

//   orderDetails:OrderDetails={
//     fullName:'',
//     fullAddress:'',
//     contactNumber:'',
//     alternateContactNumber:'',
//     orderProductQuantityList:[]

//   }
//   constructor( activatedRoute:ActivatedRoute,
//     private productService:ProductService){

//   }
//   ngOnInit(): void {
//     this.productDetails=this.activatedRoute.snapshot.data['productDetails'];
//     this.productDetails.forEach(
//       x=>this.orderDetails.orderProductQuantityList.push(
//         {productId:x.productId,quantity:1}
//       )
//     );

//     console.log(this.productDetails);
//     console.log(this.orderDetails);
//   }
//   public placeOrder(orderForm: NgForm){
//     this.productService.placeOrder(this.orderDetails).subscribe(
//       (resp)=>{
//         console.log(resp);
//         orderForm.reset;
//       },
//       (err)=>{
//         console.log(err);
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../_model/order-details.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  isSingleProductCheckout: string = '';
  productDetails: Product[] = [] ;

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    
    orderProductQuantityList: []
  }

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        { productId: x.productId, quantity: 1 }
      )
    );

    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

