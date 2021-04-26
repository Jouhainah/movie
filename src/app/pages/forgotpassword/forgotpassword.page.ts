import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  validationMessage = {
    email:[{type:"required", message:"Please enter your Email Adress"},
          {type:"pattern",message:"The Email entered is Incorrect.Try again.."}
     ]
    }

  ValidationEmail: FormGroup;
  loading: any;

  constructor(public formbuilder: FormBuilder,private authService : AuthService,private router: Router,public loadingCtrl : LoadingController, private navCtr: NavController , private alertCtrl: AlertController){
    this.loading = this.loadingCtrl
   }

  ngOnInit() {
    this.ValidationEmail = this.formbuilder.group({
    
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ]))
  })

}

  forgotPassword(value){
    this.showalert();
    try {
      this.authService.forgotPassword(value).then(resp => {
        console.log(resp);
        //window.alert('Password reset email sent, check your inbox.');
        this.loading.dismiss();
        this.Loading();
      },error => {  
        //window.alert(error);
        this.loading.dismiss();
        this.errorLoading(error.message);
    }
        )
    }catch (error) {
      console.log(error)
    }

  }

  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header:"Error Reset Password",
      message:message,
      buttons:[{
        text:'ok',
        handler: ()=>{
        this.navCtr.navigateBack(['forgotPassword'])
      }
      }]
    })
     await loading.present();
  }

  async Loading() {
    const alert = await this.alertCtrl.create({
      header: 'Success Reset Password',
      message: 'Password reset email sent, check your inbox.',
      buttons:[{
        text:'ok',
        handler: ()=>{
        this.navCtr.navigateBack(['loginscreen'])
      }
      }]
    });

    await alert.present();
  }

  async showalert(){
    var load = await this.loadingCtrl.create({
      message:"please wait....",
   
    })
     load.present();
   }

}
