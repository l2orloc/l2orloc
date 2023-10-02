import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUsuario : FormGroup;
  constructor(
    private fb: FormBuilder, 
    private toastr: ToastrService, 
    private router:Router,
    private atf:AuthenticationService,
    private firebaseError:FirebaseCodeErrorService,

  ){this.loginUsuario = this.fb.group({
    email: [``, Validators.required],
    password: [``, Validators.required]
    

})}
login(){
  
  const email = this.loginUsuario.value.email;
  const password = this.loginUsuario.value.password;
  
  this.atf.login(email,password).then((user)=>{
    this.router.navigate(['/dashboard']);
    this.toastr.success(`Bienvenido ${email}`,"SUCCESS");
    }).catch((error)=>{
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error')
     });
 
}


}
