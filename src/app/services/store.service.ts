import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {cliente}from '../../app/interfaces/cliente'
import {
  Firestore, collection ,collectionData,
  addDoc, doc,  deleteDoc, setDoc,
  query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private fts:Firestore,) { }
  
 //cuando un usuario se registra se crea una coleccion a su nombre 
  crearcoleccion(user:string){
    const colletionuser=collection(this.fts,user)
    return addDoc(colletionuser,{
      nombre:"Este ",
      direccion:"es",
      email:"cliente ",
      telefono:"prueba",
      contacto:"",
      
    })
  }

//añade un registro a la base de datos
añadir(user:string,cliente:cliente){
    const colletionuser=collection(this.fts,user);
    return addDoc(colletionuser,cliente)
}

//devuelve todos los documentos de la base de datos en forma obserbables 
getclientes(user:string):Observable<cliente[]>{
  const colletionuser=collection(this.fts,user);
 return collectionData(colletionuser,{idField:'id'}) as Observable<cliente[]>;
}

// devuelve todos los documentos de la base de datos que coincidan con la busqueda en forma observables
getclientesB(user:string,busqueda:string):Observable<cliente[]>{
  return collectionData(query(collection(this.fts,user),where('nombre','==',busqueda))) as Observable<cliente[]>
}

//borra un cliente de la Base de datos
deletecliente(user:string,cliente:cliente){
  const clientedoc=doc(this.fts,`${user}/${cliente.id}`);
  return deleteDoc(clientedoc);
}

//edita un client de la base de datos
editcliente(user:string,cliente:cliente,id:string){
  const clientedoc=doc(this.fts,`${user}/${id}`);
  setDoc(clientedoc,cliente)
}
}
