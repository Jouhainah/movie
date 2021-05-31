import { Movie } from 'src/app/models/movies.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public movie: Movie;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    const movieId: string = this.route.snapshot.paramMap.get('id');
    this.authService.getMovieDetail(movieId).subscribe((movie) => {
      this.movie = movie;
    });
  }

  async deleteMovie(movieId: string, name: string): Promise<void> {
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete ${name}?`,
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
            this.authService.deleteMovie(movieId).then(() => {
              this.router.navigateByUrl('tabs');
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
