import { fileHandle } from "./file-handle.model";

export interface Product{
    subscribe(arg0: (response: Product) => void, arg1: (error: import("@angular/common/http").HttpErrorResponse) => void): Product;
    productName: string,
    productDescription: string,
    productDiscountedPrice: number,
    productActualPrice: number,
    productImages: fileHandle[]
}