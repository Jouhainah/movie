import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';

import { LoadingController, AlertController } from '@ionic/angular';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { finalize } from 'rxjs/operators';

export interface ImageData {
  fileName: string;
  filePath: string;
  size: string;
}
@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {
  public addMovieForm: FormGroup;
  imgSrc: string;
  selectedImage: any;
  isSubmitted: boolean;
  fileName: string;
  fileSize: string;
  isLoading: boolean;
  isLoaded: boolean;
  imagefile: Observable<ImageData[]>;
  imageUpload: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  fileImageUPload: Observable<any>;
  userUID: AngularFirestoreDocument;
  private win: any = window;

  private imageCollection: AngularFirestoreCollection<ImageData>;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private database: AngularFirestore,
    private storage: AngularFireStorage,
    private loading: LoadingController
  ) {
    this.addMovieForm = formBuilder.group({
      title: ['', Validators.required],
      storyLine: ['', Validators.required],
      director: ['', Validators.required],
      genre: ['', Validators.required],
      stars: ['', Validators.required],
      duration: ['', Validators.required],
      date: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

    this.isLoading = false;
    this.isLoaded = false;
    this.imageCollection = this.database.collection<ImageData>('loginUploads');
    this.imagefile = this.imageCollection.valueChanges();
  }

  ngOnInit() {}

  showPreview(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }
  async addMovie() {
    const title = this.addMovieForm.value.title;
    const storyLine = this.addMovieForm.value.storyLine;
    const director = this.addMovieForm.value.director;
    const genre = this.addMovieForm.value.genre;
    const stars = this.addMovieForm.value.stars;
    const date = this.addMovieForm.value.date;
    const duration = this.addMovieForm.value.duration;
    const imageUrl = this.addMovieForm.value.imageUrl;
    const filePath = `${this.addMovieForm.value.title}/${
      this.selectedImage.name
    }_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage
      .upload(filePath, this.selectedImage)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.addMovieForm.value.imageUrl = url;
            this.movieService.addMovie(
              title,
              storyLine,
              director,
              genre,
              stars,
              date,
              duration,
              imageUrl
            );
            /*.then(
                () => {
                  loading.dismiss().then(() => {
                    this.router.navigateByUrl('tabs');
                  });
                },
                (error) => {
                  loading.dismiss().then(() => {
                    console.error(error);
                  });
                }
              )*/
          });
        })
      )
      .subscribe();
  }
  // return await loading.present();

  /*   this.movieService
      .addMovie(
        title,
        storyLine,
        director,
        genre,
        stars,
        date,
        duration,
        imageUrl
      )
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('tabs');
          });
        },
        (error) => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );
    return await loading.present();
  }
*/
}
