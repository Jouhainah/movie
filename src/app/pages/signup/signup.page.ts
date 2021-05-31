/* eslint-disable @typescript-eslint/quotes */
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  validationMessage = {
    name: [{ type: 'required', message: 'Please enter your Full Name' }],
    phone: [
      { type: 'required', message: 'Please enter your Phone No.' },
      { type: 'pattern', message: 'Please, Enter 8 digit Mobile Number..' },
    ],
    email: [
      { type: 'required', message: 'Please enter your Email Adress' },
      {
        type: 'pattern',
        message: 'The Email entered is Incorrect.Try again..',
      },
    ],
    password: [
      { type: 'required', message: 'password is required here ' },
      {
        type: 'minlength',
        message: 'The Password must be at least 6 characters or more',
      },
    ],
  };

  validationFormUSer: FormGroup;
  loading: any;
  user: { name; email; phone };

  constructor(
    public formbuilder: FormBuilder,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    public loadingCtrl: LoadingController,
    private navCtr: NavController,
    private alertCtrl: AlertController
  ) {
    this.loading = this.loadingCtrl;
  }

  ngOnInit() {
    this.validationFormUSer = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),

      phone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          ,
          Validators.pattern('^[0-9]{8}$'),
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),

      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }

  registerUser() {
    this.user = this.validationFormUSer.value;
    this.showalert();
    try {
      this.authService.userRegistration(this.user).then(
        (resp) => {
          this.firestore
            .collection('profile')
            .doc(resp.user.uid)
            .set({
              name: this.user.name,
              email: this.user.email,
              phone: this.user.phone,
              isAdmin: false,
            })
            .then(() => {
              this.firestore
                .collection('profile')
                .doc(resp.user.uid)
                .get()
                .subscribe((result) => {
                  if (result.exists) {
                    this.authService.setUserProfile(result.data());
                    this.authService.storeProfile(result.data());
                  }
                });
            });
          this.loading.dismiss();
          this.Loading();
        },
        (error) => {
          this.loading.dismiss();
          this.errorLoading(error.message);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async errorLoading(message: any) {
    const loading = await this.alertCtrl.create({
      header: 'Error Registering',
      message,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.navCtr.navigateBack(['signup']);
          },
        },
      ],
    });
    await loading.present();
  }

  async Loading() {
    const alert = await this.alertCtrl.create({
      header: 'Thanks for signing up',
      subHeader: "We're glad you're here",
      message: 'Jump in and Get Started',
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.navCtr.navigateBack(['loginscreen']);
          },
        },
      ],
    });

    await alert.present();
  }

  async showalert() {
    const load = await this.loadingCtrl.create({
      message: 'please wait....',
    });
    load.present();
  }
}
