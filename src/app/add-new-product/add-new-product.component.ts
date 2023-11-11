import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
interface FileHandle {
  file: File;
  url: any; // You might want to use a specific type for URLs here
}

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product: Product = {
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    subscribe: function (arg0: (response: Product) => void, arg1: (error: HttpErrorResponse) => void): Product {
      throw new Error('Function not implemented.');
    },
    productImages: []
  }

  constructor(private productService: ProductService, 
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute) { }
  
    ngOnInit(): void {
    this.product= this.activatedRoute.snapshot.data['product'];
  }

  addProduct(productForm: NgForm) {
    const productFormData=this.prepareFormData(this.product);
    this.productService.addProduct(this.product).subscribe(
      (response: Product) => {
        productForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  prepareFormData(product: Product):FormData{
    const formData=new FormData();
    //provide backend data
    formData.append(
      'product',
      new Blob([JSON.stringify(product)],{type:'application/json'})
    );
    for(var i=0;i<product.productImages.length;i++){
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }
    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.product.productImages.push(fileHandle);
    }
  }
  removeImages(i:number){
    this.product.productImages.splice(i,1);
  }
  fileDropped(fileHandle:FileHandle){
    this.product.productImages.push(fileHandle);
  }
}
