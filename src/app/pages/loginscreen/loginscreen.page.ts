import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {

  validationUserMessage ={
    email:[
      {type:"required", message:"Please enter your Email"},
      {type:"pattern", message:"The Email entered is Incorrect.Try again"}
    ],
    password:[
      {type:"required", message:"please Enter your Password!"},
      {type:"minlength", message:"The Password must be at least 6 characters or more"}

    ]
  }
  
   validationFormUser: FormGroup;

  constructor(public formbuilder: FormBuilder, private nav: NavController, private authService: AuthService,private router: Router) { }

  ngOnInit() {


    this.validationFormUser = this.formbuilder.group({
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
  
  LoginUser(value){
    console.log("Logged In")
    try {
      this.authService.loginFireauth(value).then(resp => {
        console.log(resp);
        this.router.navigate(['tabs'])
      }
        )
    } catch (error) {
      
    }
  }

  registerUser(){ 
    this.nav.navigateForward(['signup'])
  }
  
}

