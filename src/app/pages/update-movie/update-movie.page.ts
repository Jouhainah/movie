import { Movie } from './../../models/movies.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.page.html',
  styleUrls: ['./update-movie.page.scss'],
})
export class UpdateMoviePage implements OnInit {
  public movie: Movie;
  public updatedMovie: Movie;
  public updateMovieForm: FormGroup;
  movieId: string;
  constructor(
    public movieService: MovieService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    public authService: AuthService,
    formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.updateMovieForm = formBuilder.group({
      title: ['', Validators.required],
      storyLine: ['', Validators.required],
      director: ['', Validators.required],
      genre: ['', Validators.required],
      stars: ['', Validators.required],
      duration: ['', Validators.required],
      date: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetail(this.movieId).subscribe((movie) => {
      this.movie = movie;
    });
  }

  async updateMovie() {
    const loading = await this.loadingCtrl.create();
    const id: string = this.movieId;
    const title: string = this.updateMovieForm.value.title;
    const storyLine: string = this.updateMovieForm.value.storyLine;
    const director: string = this.updateMovieForm.value.director;
    const genre: string = this.updateMovieForm.value.genre;
    const stars: string = this.updateMovieForm.value.stars;
    const date: string = this.updateMovieForm.value.date;
    const duration: string = this.updateMovieForm.value.duration;
    const imageUrl: string = this.updateMovieForm.value.imageUrl;

    this.updatedMovie = {
      id,
      title,
      storyLine,
      genre,
      duration,
      director,
      stars,
      date,
      imageUrl,
    };

    this.movieService.updateMovie(this.movieId, this.updatedMovie).then(
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
}
