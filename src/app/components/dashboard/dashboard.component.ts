import { Component,  OnInit } from '@angular/core';
import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cliente } from 'src/app/interfaces/cliente';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  //Array de clientes
  clientes:cliente[]=[];
  //formularios editar y añadir clientes
  nuevocliente:FormGroup;
  editarcliente:FormGroup;
  buscar:FormGroup;
  //cliente capturado para edita o borrar
  clienteED?:cliente;
  //datos de usuario registrado
  private usermal?:User;
  //booleano para alternar formularios
  editar:boolean=false;
  mostrarB:boolean=false;
 
//id de editar cliente
  id:number =0;
   clienteid:string='';
   constructor(
    private atf:AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private fst:StoreService,
    private ath:Auth,
    private toast:ToastrService){
      //Inicializamos los dos formularios en el constructor
      this.nuevocliente=fb.group({
        nombre:``,
        direccion:``,
        email:``,
        telefono:``,
        contacto:``,
      }
      )
      this.editarcliente=fb.group({
        nombre:``,
        direccion:``,
        email:``,
        telefono:``,
        contacto:``,
      })
      //inicializamos datos de usuario
      onAuthStateChanged(this.ath,async (user)=>{
        this.usermal=user as User;
      })
      this.buscar=fb.group({
        busqueda:``,
      })
      
    
   }
  ngOnInit(): void {
    //caputramos datos de firestore en tiempo real para almacenarlos en el array
   this.fst.getclientes(this.usermal?.email as string).subscribe(clientes=>{
    this.clientes=clientes;
    
   })
    
  }
  //capturamos el mail del usuario para mostrarlo en pantalla
  user():string{
    return this.usermal?.email as string;
  }
   //añadir cliente desde formulario
  anadir(){
    this.fst.añadir(this.usermal?.email as string,this.nuevocliente.value).then(()=>
    {
      this.toast.success('GRACIAS','Cliente añadido correctamente')
    }
    ).catch((error)=>{
      this.toast.error('Error',error);
    });
    
    //Inicializamos formulario para poder meter otro cliente
    this.nuevocliente=this.fb.group({
      nombre:``,
      direccion:``,
      email:``,
      telefono:``,
      contacto:``,
    })
  
  }
   //funcion borrar
  async borrar(cliente:cliente){
    const response =await this.fst.deletecliente(this.usermal?.email as string,cliente);
       
    }

  //funcion inicio de Editar.Oculta formulario de añadir,muestra formulario de
  // edicion y captura datos del cliente a editar
  editaraOp(cliente:cliente){
    this.editar=true;
    this.clienteED=cliente;
    this.editarcliente.setValue({
      nombre:this.clienteED.nombre,
      direccion:this.clienteED.direccion,
      email:this.clienteED.email,
      telefono:this.clienteED.telefono,
      contacto:this.clienteED.contacto,
      })
    }

  //funcion de editar con los datos del formulario editarcliente y la id capturada en clienteED
  editarAL(){
    this.fst.editcliente(this.usermal?.email as string,this.editarcliente.value,this.clienteED?.id as string)
    this.editar=false;
    }

  //cancela la edicion de cliente y vuelve a mostrar el formulario agregar cliente ocultando el formulario editar
  cancelar(){
    this.editar=false;
  }
  //funcion busqueda
  mostrarBus(){
    console.log(this.buscar);
    this.mostrarB=true;
    this.clientes=[];
    const busqu=this.buscar.value
    this.fst.getclientesB(this.usermal?.email as string,busqu.busqueda).subscribe(clientes=>{
      this.clientes=clientes;
      
      
    })
  }
  //funcion cancelar busqueda
  cancelarBus(){
    this.buscar=this.fb.group({
      busqueda:``
    })
    this.mostrarB=false;
    this.clientes=[];
    this.fst.getclientes(this.usermal?.email as string).subscribe(clientes=>{
      this.clientes=clientes
  })
}
 
//logOut
Onclick(){
  this.atf.logout().then(()=>{
      this.router.navigate([`/login`]);
    })
  }
}
