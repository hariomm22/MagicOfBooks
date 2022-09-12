import { LoginData } from './../model/LoginData';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { UserApiService } from '../service/user-api/user-api.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!:FormGroup;
  userLoginData:LoginData = new LoginData();
  hide = true;
  constructor(private formBuilder:FormBuilder,private router:Router,private dialog:Dialog,private authentication:AuthenticationService,private userApi:UserApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  listOfAllBooks(){
    alert("You can only see the list of registered books,If you Want to Perform Action on it then please Login");
    this.router.navigate(["listofbooks"]);
  }

  openUserDialog(){
    this.dialog.open(UserRegisterComponent,{
      width:'40%'
    });
  }
 
  logData():boolean{
    if(this.loginForm.valid){
    
      return false;
     }
    else {
  
      return true;
    }
  }
  onSubmit(){
    this.userLoginData.userName = this.loginForm.value.userName;
    this.userLoginData.password = this.loginForm.value.password;
    this.userApi.getUsers().subscribe(response=>{
      const user = response.find((userData:any)=>{
        return (userData.userName === this.loginForm.value.userName || userData.email === this.loginForm.value.userName) && userData.password === this.loginForm.value.password
    });
    if(user){
      this.authentication.isAuthenticated=true;
      alert("Login Is Done Successfully");
        this.loginForm.reset();
        this.router.navigate(['dashboard/allbooks'])
    } else{
      alert("Invalid Credentials...! try again");
    }
  })
   
  }

}
