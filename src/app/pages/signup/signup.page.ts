import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  validationMessage = {
      name:[{type:"required", message:"Please enter your Full Name"}],
      phone:[{type:"required", message:"Please enter your Phone No."},
            {type:"pattern",message:"Please, Enter 8 digit Mobile Number.."}] ,
      email:[{type:"required", message:"Please enter your Email Adress"},
            {type:"pattern",message:"The Email entered is Incorrect.Try again.."}
       ], 
      password:[{type:"required", message:"password is required here "},
                {type:"minlength",message:"The Password must be at least 6 characters or more"}
        ], 
  }

  ValidationFormUSer: FormGroup;
  loading: any;
  
  constructor(public formbuilder: FormBuilder,private authService : AuthService, private router: Router,public loadingCtrl : LoadingController, private navCtr: NavController , private alertCtrl: AlertController){
    this.loading = this.loadingCtrl
   }

  ngOnInit() {
    this.ValidationFormUSer = this.formbuilder.group({
      name: new FormControl('', Validators.compose([
         Validators.required
      ])),
  
      phone: new FormControl('', Validators.compose([
        Validators.required,
        , Validators.pattern("^[0-9]{8}$")
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
  
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
  
    })
  
  }

  registerUser(value){
    this.showalert();
    //console.log("Signed In")
    try {
      this.authService.UserRegistration(value).then(resp => {
        console.log(resp);
        if (resp.user){
          resp.user.updateProfile({
            displayName: value.name,
            email: value.email,
            phoneNumber: value.phone,

          });
      
        }
        this.loading.dismiss();
        this.router.navigate(['loginscreen'])

      }, error=>{

        this.loading.dismiss();
        this.errorLoading(error.message);

      }
        )
    } catch (eror) {
      console.log(eror)
    }
  }

  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header:"Error Registering",
      message:message,
      buttons:[{
        text:'ok',
        handler: ()=>{
        this.navCtr.navigateBack(['signup'])
      }
      }]
    })
     await loading.present();
  }

  async showalert(){
    var load = await this.loadingCtrl.create({
      message:"please wait....",
   
    })
     load.present();
   }

}
