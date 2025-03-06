import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { loginModel } from './models/login.model';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'libs/shared/services/storage.service';
import { Router } from '@angular/router';
import { URL_CONFIG } from 'libs/shared/configs/url-mapper';
// import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit { 
  public loginForm:FormGroup;
  public loginData:loginModel;
  public socialUser: any;
  public isLoggedIn: boolean = false;

  constructor(private fb:FormBuilder,
              private httpClient:HttpClient,
              private storageService:StorageService,
              // private socialAuthService: SocialAuthService,
              private router:Router
  ){

  }
  ngOnInit(): void {
    this.setFormControls();
    // this.initializeGoogleSignIn()
    // this.socialAuthService.authState.subscribe((user)=> {
    //   this.socialUser = user;
    //   this.isLoggedIn = user != null;
    // })
  }

  initializeGoogleSignIn(): void {
    // @ts-ignore
     google.accounts.id.initialize({
      client_id: '239131695341-0vaio72hsv7l06ml2ulfq5ul1aam8vo8.apps.googleusercontent.com',
      auto_select:false,
      callback: this.handleCredentialResponse.bind(this)
     });

    // Render the Google Sign-In button
    // @ts-ignore
     google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large', text:'signup_with' } // Customize button appearance
     );

    // Optional: Automatically prompt user for sign-in
    // @ts-ignore
     google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any): void {
    const token = response.credential;
    this.loginUser('gmail',token);
  }

  setFormControls() {
    this.loginData = new loginModel();
    this.loginForm = this.fb.group({
      email:this.fb.control('',[Validators.required,Validators.email]),
      password:this.fb.control('',[Validators.required])
    });

    this.loginForm.valueChanges.subscribe((formData)=> {
      this.loginData.email    = formData.email;
      this.loginData.password = formData.password;
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  getUserDetails(userId) {
    this.httpClient.get(URL_CONFIG.usersList + userId)
    .subscribe((data:any)=> {
      this.storageService.userDetails = data['success'];
      this.router.navigate(['/overview']);
    },
    err=> {
      console.log(err)
    })
  }

  loginUser(type:string, token = null) {
    this.loginData.type = type;
    if (type != 'normal') {
      this.loginData['token'] = token;
    }
    this.httpClient.post(URL_CONFIG.login, this.loginData)
    .subscribe((data:any)=> {
      this.storageService.tokenDetails = data['success'].token;
      this.getUserDetails(data['success'].userId);
    },
    err=> {
      console.log(err)
    })
  }

  guestMode() {
    this.httpClient.get(URL_CONFIG.guestMode)
      .subscribe((data:any) => {
        this.storageService.tokenDetails = data['success'].token;
        this.getUserDetails(data['success'].userId);
      }, 
      err => {
        console.log(err)
      })
  }

  onSubmit() {
    if (this.loginForm.valid) {
     this.loginUser('normal');
    }
  }
}

