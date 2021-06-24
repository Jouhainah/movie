import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movies.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public movieList: Observable<Movie[]>;
  constructor(
    public movieService: MovieService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.movieList = this.movieService.getMovieList();
  }
}
