import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public movieList: any[];
  public movieListBackup: any[];
  constructor(private firestore: AngularFirestore) {}

  async ngOnInit() {
    this.movieList = await this.initializeItems();
  }

  async initializeItems(): Promise<any> {
    const foodList = await this.firestore
      .collection('movieList')
      .valueChanges()
      .pipe(first())
      .toPromise();
    this.movieListBackup = foodList;
    return foodList;
  }

  async filterList(evt) {
    this.movieList = await this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.movieList = this.movieList.filter((currentMovie) => {
      if (currentMovie.title && searchTerm) {
        return (
          currentMovie.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1 ||
          currentMovie.director
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) > -1
        );
      }
    });
  }
}
