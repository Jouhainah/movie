import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth'

export  interface UserPro{
  username: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private user : UserPro;

  constructor(public auth: AngularFireAuth,) { }

  loginFireauth(value){
    return new Promise<any> ( (resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        error => reject(error)
      )
    })
   }

   userRegistration(value){
    return new Promise<any> ( (resolve, reject)=>{
      firebase.auth().createUserWithEmailAndPassword(value.email,value.password).then(
        res => resolve(res),
        error => reject(error)
      )
    })
  }

  forgotPassword(value) {
    return new Promise<any> ( (resolve, reject)=>{
      firebase.auth().sendPasswordResetEmail(value.email).then(
        res => resolve(res),
        error => reject(error)
      )
    })
  }
    
  
}
