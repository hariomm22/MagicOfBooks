import { UserApiService } from './../service/user-api/user-api.service';
import { UserData } from './../model/UserData';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  hide = true;
  userData!:FormGroup;
  userDataObj : UserData = new UserData();
  constructor(private formBuilder:FormBuilder,private dialog:Dialog,private userApi:UserApiService) { }

  ngOnInit(): void { 
    this.userData=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:[''],
      email:['',Validators.required],
      contact:[''],
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  close(){
    this.dialog.closeAll();
  }
  onRegister(){
    if(this.userData.valid){
      this.userDataObj.firstName = this.userData.value['firstName'];
      this.userDataObj.lastName = this.userData.value['lastName'];
      this.userDataObj.email = this.userData.value['email'];
      this.userDataObj.contact = this.userData.value['contact'];
      this.userDataObj.userName = this.userData.value['userName'];
      this.userDataObj.password = this.userData.value['password'];
      console.log(this.userData);
      console.log(this.userDataObj);
      this.userApi.postUser(this.userDataObj).subscribe((response)=>{
        alert("User Regitration Successfully");
        this.close();
      },(error)=>{
        alert("User Regitration failed..!");
      })
      
    }
    else{
      alert("Please fill Required Field");
    }
  }

}