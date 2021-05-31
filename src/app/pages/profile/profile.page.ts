import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile;

  constructor(private authservice: AuthService) {}
  ngOnInit() {
    this.profile = this.authservice.getProfile();
  }
  logout() {
    this.authservice.logout();
  }
}
