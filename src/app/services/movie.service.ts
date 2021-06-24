import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Movie } from './../models/movies.interface';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  addMovie(
    title: string,
    storyLine: string,
    director: string,
    genre: string,
    stars: string,
    date: string,
    duration: string,
    imageUrl: string
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc(`movieList/${id}`).set({
      id,
      title,
      storyLine,
      director,
      genre,
      stars,
      date,
      duration,
      imageUrl
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

  updateMovie(movieId: string, movie: Movie): Promise<void> {
    return this.firestore.collection('movieList').doc(movieId).update(movie);
  }
}
