import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail, 
  signInWithEmailAndPassword,
  signOut   } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private atf:Auth,) {  }
      
  register(email:string,pass:string){
    return createUserWithEmailAndPassword(this.atf,email,pass);
  }

  login(email:string,pass:string){
   return signInWithEmailAndPassword(this.atf,email,pass);
  }
  logout(){
    return signOut(this.atf);
  }
  recuperarpass(email:string){
    return sendPasswordResetEmail(this.atf,email);
  }
      
}
