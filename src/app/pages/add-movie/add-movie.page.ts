import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {
  public addMovieForm: FormGroup;
  constructor(public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder,
    private authService : AuthService,
    private router: Router) { 
      this.addMovieForm = formBuilder.group({
      name: ['', Validators.required],
      storyLine: ['', Validators.required],
      director: ['', Validators.required],
      writers: ['', Validators.required],
      stars: ['', Validators.required],
    });}

  ngOnInit() {
  }

  async addMovie() {
    const loading = await this.loadingCtrl.create();
  
    const name = this.addMovieForm.value.name;
    const storyLine = this.addMovieForm.value.storyLine;
    const director = this.addMovieForm.value.director;
    const writers = this.addMovieForm.value.writers;
    const stars = this.addMovieForm.value.stars;

    this.authService
    .addMovie(name,storyLine,director,writers,stars)
    .then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('tabs');
        });
      },
      error => {
        loading.dismiss().then(() => {
          console.error(error);
        });
      }
    );
    return await loading.present();
  }

}
