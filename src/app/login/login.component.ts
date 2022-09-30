import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFormGroup!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private authService:AuthentificationService,
              private router: Router) { }

  ngOnInit(): void {

    this.userFormGroup = this.formBuilder.group({
      username: this.formBuilder.control(""),
      password:this.formBuilder.control("")
    });
  }

  handlerLogin() {
      let username = this.userFormGroup.value.username;
      let password = this.userFormGroup.value.password;
      console.log(username+"-"+password);
      this.authService.login(username,password).subscribe({
        next:(appUser)=>{
            this.authService.authentificateUser(appUser).subscribe({
              next:(data)=>{
                this.router.navigateByUrl("/admin");
              },
              error:(error)=>{


              }
            })
        },
        error:(error)=>{
          this.errorMessage = error;

        }

      })
  }
}
