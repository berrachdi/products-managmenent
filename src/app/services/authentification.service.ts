import { Injectable } from '@angular/core';
import {UserApp} from "../model/User";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  users!: Array<UserApp>;
  authUser: UserApp | undefined;

  constructor() {
    this.users = [
      {userId: UUID.UUID(),username:"user1",password:"12345",roles:["USER"]},
      {userId: UUID.UUID(),username:"user2",password:"12345",roles:["USER"]},
      {userId: UUID.UUID(),username:"admin",password:"12345",roles:["ADMIN","USER"]},

    ]
  }

  public login(username:string,password:string):Observable<UserApp>{
    let appUser = this.users.find(u=>u.password == password && u.username == username);
    if(!appUser){
      return throwError(()=>"Username or password incorrect!")
    }else{
      return of(appUser);
    }

  }

  public authentificateUser(user: UserApp): Observable<boolean>{
    this.authUser = user;
    localStorage.setItem("authUser",JSON.stringify({
      "username":user.username,
      "roles":user.roles,
      "jwt":"JWT_TOKEN"
    }));

    return of(true);

  }

  public hasRole(role:string):boolean{
    return this.authUser!.roles.includes(role);
  }

  public isAuthentificated():boolean{
    return this.authUser!=undefined;
  }

  logOut():Observable<boolean> {
    this.authUser = undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
}
