import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

export interface UserPro {
  username: string;
  uid: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public profile$: BehaviorSubject<any> = new BehaviorSubject(null);

  private user: UserPro;
  //firestore: any;

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private route: Router
  ) {}
  loginFireauth(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (error) => reject(error)
        );
    });
  }

  setUser(user: UserPro) {
    return (this.user = user);
  }

  getUID(): string {
    return this.user.uid;
  }
  getUser(id: string) {
    return this.firestore.collection('UserInfo').doc(id).get();
  }

  userRegistration(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (error) => reject(error)
        );
    });
  }

  forgotPassword(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(value.email)
        .then(
          (res) => resolve(res),
          (error) => reject(error)
        );
    });
  }

  setUserProfile(data) {
    this.profile$.next(data);
  }
  getProfile(){
    return this.profile$.value;
  }

  isAdmin() {
    return this.profile$.value.isAdmin;
  }

  storeProfile(data) {
    localStorage.setItem('profile', JSON.stringify(data));
  }
  loadProfile() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    this.profile$.next(profile);
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.clear();
    this.auth.signOut().then(() => {
      this.profile$.next(null);

      this.route.navigate(['/', 'login']);
    });
  }
}
