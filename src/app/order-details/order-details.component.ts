import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No.', 'Status', 'Action'];
  dataSource : MyOrderDetails[] = [];

  status: string = 'All';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  // getAllOrderDetailsForAdmin(statusParameter: string) {
  //   this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
  //     (resp) => {
  //       this.dataSource = resp;
  //       console.log(resp);
  //     }, (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  getAllOrderDetailsForAdmin(statusParameter: string) {
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (resp: MyOrderDetails[]) => {  // Specify the type explicitly
        this.dataSource = resp;
        console.log(resp);
      }, (error) => {
        console.log(error);
      }
    );
  }
  
  markAsDelivered(orderId: string) {
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (response) => {
        this.getAllOrderDetailsForAdmin(this.status);
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    );
  }

}