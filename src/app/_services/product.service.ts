import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  public addProduct(product : Product){
    return this.httpClient.post<Product>("https://localhost:9090/addNewProduct",product);
  }

  public getAllProducts(){
    return this.httpClient.get<Product[]>("http://localhost:9000/getAllProducts");
  }

  public getProductDetailsById(productId: string){
    return this.httpClient.get<Product>("http://localhost:9090/getProductDetailsById/"+productId);
  }
  public deleteProduct(productId:number){
    return this.httpClient.delete("http://localhost:9090/deleteProductDetails/3"+productId);
  }

   public getProductDetails(isSingleProductCheckout: string | null, productId: string | null){
    return this.httpClient.get<Product[]>("http://localhost:9090/getProductDetails"+isSingleProductCheckout+"/"+productId)
}

public placeOrder(orderDetails: OrderDetails, isCartCheckout: string | undefined) {
  return this.httpClient.post("http://localhost:9090/placeOrder/"+isCartCheckout, orderDetails);
}

}
