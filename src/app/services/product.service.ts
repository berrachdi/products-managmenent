import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product,ProductPage} from "../model/Product";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<Product>;

  constructor() {
    this.products=[
      {id:UUID.UUID(), name: "Computer", price:6500, promotion:true},
      {id:UUID.UUID(), name: "Printer", price:1400,promotion:false},
      {id:UUID.UUID(), name: "Smart phone", price:3400,promotion:false}
    ];
    for (let i = 0;i<10;i++){
      this.products.push( {id:UUID.UUID(), name: "Computer"+i, price:6500, promotion:true});
      this.products.push( {id:UUID.UUID(), name: "Printer"+i, price:1400,promotion:false});
      this.products.push( {id:UUID.UUID(), name: "Smart phone"+i, price:3400,promotion:false});
    }
  }

  public getAllProducts(): Observable<Array<Product>>{
    let random = Math.random();
    if(random < 0.1){
      return throwError(()=>new Error("Internet connection error"))
    }else{
      return of([...this.products]);
    }

  }

  public deleteProduct(id:string){
    this.products = this.products.filter(p=>p.id!=id);
    return of(this.products);
  }

  public setPromotion(id:string): Observable<boolean>{

    let product = this.products.find(p=>p.id==id);

    if(product!=undefined){

      product.promotion = !product.promotion;
      console.log("service:"+product.promotion);
      return of(true);

    }else{

      return throwError(()=> new Error("Product not found!"));


    }
  }

  public searchProduct(keyword:string,size:number,page:number): Observable<ProductPage>{

    let results = this.products.filter(p=>p.name.includes(keyword));
    let totalPages = ~~(results.length / size);
    console.log(totalPages);
    console.log(results.length);
    console.log(results.length % size);
    let start = page*size;
    if(results.length % size != 0){
      totalPages++;
    }
    let pageProducts = results.slice(start,start+size);
    let productPageObject = new ProductPage(size,page,pageProducts,totalPages);

    return of(productPageObject);


  }

  public getPageProducts(page:number, size: number):Observable<ProductPage>{
    let totalPages = ~~(this.products.length / size);
    console.log(totalPages);
    console.log(this.products.length);
    console.log(this.products.length % size);
    let start = page*size;
    if(this.products.length % size != 0){
      totalPages++;
    }
    let pageProducts = this.products.slice(start,start+size);
    let productPageObject = new ProductPage(size,page,pageProducts,totalPages);

    return of(productPageObject);


  }

  addproduit(name: string, price: number):Observable<boolean> {
    this.products.push({id:UUID.UUID(),name:name,price:price,promotion:false});
    return of(true);

  }
}
