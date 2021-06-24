import { Movie } from './../../models/movies.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  profile;
  public bookMovieForm: FormGroup;

  movie: Movie;
  movieId: string;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public movieService: MovieService,
    private alertController: AlertController,
    public authService: AuthService,
    private nav: NavController,
    formBuilder: FormBuilder
  ) {
    this.bookMovieForm = formBuilder.group({
      totalseat: ['', Validators.required],
      totalamount: ['', Validators.required],
      seats: ['', Validators.required],
    });
  }

  close() {
    this.nav.navigateForward([`tabs/tabs/home/detail/${this.movieId}`]);
  }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetail(this.movieId).subscribe((movie) => {
      this.movie = movie;
    });
  }
  async bookMovie() {
    const totalseat = this.bookMovieForm.value.totalseat;
    const totalamount = this.bookMovieForm.value.totalamount;
    const seats = this.bookMovieForm.value.seats;
  }
}
