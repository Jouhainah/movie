import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Movie } from './../models/movies.interface';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';

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

  addMovie(
    name: string,
    storyLine: string,
    director: string,
    writers: string,
    stars: string
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc(`movieList/${id}`).set({
      id,
      name,
      storyLine,
      director,
      writers,
      stars,
    });
  }

  getMovieList(): Observable<Movie[]> {
    return this.firestore.collection<Movie>(`movieList`).valueChanges();
  }

  getMovieDetail(movieId: string): Observable<Movie> {
    return this.firestore
      .collection('movieList')
      .doc<Movie>(movieId)
      .valueChanges();
  }

  deleteMovie(movieId: string): Promise<void> {
    return this.firestore.doc(`movieList/${movieId}`).delete();
  }

  setUserProfile(data) {
    this.profile$.next(data);
  }
  getProfile() {
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
    this.auth.signOut().then(() => {
    localStorage.clear();
    this.profile$.next(null);

      this.route.navigate(['/', 'login']);
    });
  }
}
