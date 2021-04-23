import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  
  constructor(public formbuilder: FormBuilder) { }

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

  registerUser(value){}
}
