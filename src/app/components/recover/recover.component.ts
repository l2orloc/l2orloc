import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {FirebaseCodeErrorService} from '../../services/firebase-code-error.service'
@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent {
email:FormGroup;
mail:any;
constructor(
  private firebaseError: FirebaseCodeErrorService,
  private fb:FormBuilder,
  private atf:AuthenticationService,
  private toastr: ToastrService,
)

  {
    this.email=this.fb.group({
    mail:'',
    })
  }

recover(){
this.mail=this.email;
this.atf.recuperarpass(this.email.value.mail).then((response)=>{
  const respuesta=response;
  this.toastr.success(`Email enviado a ${this.email.value.mail} `,'Restablezca contraseña');
 }).catch(error=>{
  this.toastr.error(this.firebaseError.codeError(error.code), 'Error')
 })
}

}
