import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/services/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  
username:string="";
password:string="";

loginForm: any = FormGroup;
responseMessage: any;
constructor(private formBuilder:FormBuilder,
  private router:Router,
  private ngxService :NgxUiLoaderService,
  private snackbarService: SnackbarService
  ,  private userService:UserService,private toastr: ToastrService, 
  private cookie: CookieService){} 

ngOnInit(): void {
  this.loginForm = this.formBuilder.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]]

  })
}


login(){
  //console.log(localStorage.getItem('adresse'))
  this.ngxService.start()
  var formData = this.loginForm.value;
  var data ={
      email:formData.username,
      password:formData.password
    }
    console.log(data)
    this.userService.login(data).subscribe((response:any)=>{
      
     /// this.cookie.set("jwt",response.message)
      localStorage.setItem("email",response.email)
      localStorage.setItem("name",response.name)
      localStorage.setItem("role",response.role)
      this.router.navigate(['/home']);
      this.ngxService.stop()
      //console.log(this.cookie.get("jwt"))
    },(error)=>{
      if(error.error?.message){
        this.ngxService.stop()
        this.responseMessage = error.error?.message;
      }else{
        this.ngxService.stop()

        this.responseMessage = GlobalConstants.genericError;
      }
      this.ngxService.stop()
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      
    })
  }

}
