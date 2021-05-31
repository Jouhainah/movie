import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit() {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authService.loadProfile();
      }
    });
  }
}
