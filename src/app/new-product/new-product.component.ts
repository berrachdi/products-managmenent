import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validator, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  userFormGroup!: FormGroup;
  errorMessage!: string;
  infoMessage!:string;

  constructor(private produitService:ProductService,
              private formBuilder: FormBuilder,
              private router:Router) { }

  ngOnInit(): void {

    this.userFormGroup = this.formBuilder.group({
      name: this.formBuilder.control("",[Validators.minLength(2),Validators.required]),

      price:this.formBuilder.control("")
    })

  }

  handlerAddProduct() {

    this.produitService.addproduit( this.userFormGroup.value.name,
                                    this.userFormGroup.value.price ).subscribe({
      next:(data)=>{
        this.infoMessage = "The product is added succesfully";
        this.router.navigateByUrl("/admin/products");
      }
    });

  }

  getErrorMessage(name: string, errors: ValidationErrors):string {
    if(errors['required']){
      return name+" is required";
    }else if(errors['minlength']){
      return name +" should have at least "+errors['minlength']['requiredLength']+" caracteres"
    }else{
      return "";
    }


  }
}
