import { BookingPage } from './../booking/booking.page';
import { AuthService } from 'src/app/services/auth.service';
import { Movie } from 'src/app/models/movies.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public movie: Movie;
  private movieId: string;
  constructor(
    public movieService: MovieService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    public authService: AuthService,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetail(this.movieId).subscribe((movie) => {
      this.movie = movie;
    });
  }
  close() {
    this.nav.navigateForward(['tabs/tabs/home']);
  }
  async deleteMovie(movieId: string, title: string): Promise<void> {
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete ${title}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.movieService.deleteMovie(movieId).then(() => {
              this.router.navigateByUrl('tabs');
            });
          },
        },
      ],
    });

    await alert.present();
  }

  /*async book(event: Event) {
   const popover = await this.popoverController.create({
      component: BookingPage,
      componentProps: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
    custom_id: this.movieId,
        translucent: true,
        // eslint-disable-next-line object-shorthand
        event: event,
      },
    });
    popover.present();
  }*/
}
