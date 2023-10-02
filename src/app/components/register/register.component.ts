import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StoreService } from 'src/app/services/store.service';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrarUsuario: FormGroup ;
  
  constructor( 
    private firebaseError: FirebaseCodeErrorService,
    private auf:AuthenticationService,
    private fts:StoreService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,)
    
      {
      this.registrarUsuario = this.fb.group({
        email: [``, [Validators.required, Validators.email]],
        password: [``, [Validators.required], Validators.minLength(6)],
        repetirPassword: [``, Validators.required]
      })
  }

  registrar(){
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword  = this.registrarUsuario.value.repetirPassword;
  
    if(password !== repetirPassword){
      this.toastr.error('La contraseñas no son iguales', 'Error')
      return
    }
    this.auf.register(email,password).then(async (response)=>{
      console.log(response);
      this.toastr.success('Usuario registrado','Enhorabuena');
      const respon=await this.fts.crearcoleccion(email);
      this.router.navigate(['/login']);
      }).catch(error=>{
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error')
       })
}
}
