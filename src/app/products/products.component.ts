import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/Product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products! : Array<Product>;

  errorMessage! : string;
  searchFormGroup! : FormGroup;
  pageSize : number = 6;
  currentPage : number = 0;
  totalPages : number = 0;
  currentAction : string = "all";
  searchNumber : boolean = false;

  constructor(private productService: ProductService,
              private formBuilder:FormBuilder,
              public authService: AuthentificationService,
              private router: Router)
  { }

  ngOnInit(): void {

    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control(null)
    })
    this.handlerGetPageProducts();

  }

  handlerGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next:(data)=>{
        this.products = data;
      },
      error:(err)=>{
        this.errorMessage = err;
      }
    })
  }

  handlerDeleteProduct(p: Product) {
    let conf = confirm("Are you sure?")
    if(conf == false) return;
    this.productService.deleteProduct(p.id).subscribe(
      {
        next:(data)=>{
          let index = this.products.indexOf(p);
          this.products.splice(index,1);
        },
        error:(err)=>{
          this.errorMessage = err;
        }
      }
    )

  }

  handlerSetPromotion(p: Product){
    console.log(p.promotion)
    this.productService.setPromotion(p.id).subscribe(
      {
        next:(data)=>{

            console.log("component:"+p.promotion)





        },
        error:(err)=>{
          this.errorMessage = err;
        }
      }
    )

  }

  handlerSearchproduct() {
    this.currentAction = "search";
    if(this.searchNumber == false){this.currentPage = 0;this.searchNumber=true;}


    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProduct(keyword,this.pageSize,this.currentPage).subscribe({
      next: (data)=>{

        this.products = data.productsPage;
        this.totalPages = data.totalPages;

      }
    })


  }

  handlerGetPageProducts(){
    this.currentAction = "all";
    this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe({
      next:(data)=>{

        this.products = data.productsPage;
        this.totalPages = data.totalPages;

      },
      error:(err)=>{
        this.errorMessage = err;
      }
    })
  }

  goToPage(page: number) {
    this.currentPage = page;
    if(this.currentAction==="all"){
      this.handlerGetPageProducts();
    }else{
      console.log("SEARCH.."+this.currentPage);
      this.handlerSearchproduct();
    }

  }

  handlerAddProduct() {
      this.router.navigateByUrl("/admin/newproduct");
  }
}
