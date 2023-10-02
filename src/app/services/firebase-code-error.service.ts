import { Injectable } from '@angular/core';
import { firebaseErrorCodeEnum } from '../services/firebase-CodeError';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  codeError(code: String){

    switch(code){
      // el usuario ya exite
      case firebaseErrorCodeEnum.emailYaExiste:
        return 'El usuario ya existe'

      // debil password
      case firebaseErrorCodeEnum.passwordDebil:
        return 'La contraseña es debil'

      // email no valido
      case firebaseErrorCodeEnum.emailNoValido:
        return 'El email no es valido'
      
      // contraseña incorrecta
      case firebaseErrorCodeEnum.passwordIncorrecto:
        return 'Password incorrecto !!!'

      // el usuario no exite
      case firebaseErrorCodeEnum.usuarioNoExiste:
        return 'El usuario no existe'
      default:
        return 'Error desconocido'
    }

  }
}
