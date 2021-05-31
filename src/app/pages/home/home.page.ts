import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movies.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public movieList: Observable<Movie[]>;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.movieList = this.authService.getMovieList();
  }
}
