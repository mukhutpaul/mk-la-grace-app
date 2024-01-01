import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserComponent } from 'src/app/pages/user/user.component';
import { FormationService } from 'src/app/services/formation.service';
import { GlobalConstants } from 'src/app/services/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})

export class AddEditUserComponent implements OnInit{


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngxService :NgxUiLoaderService,
    private snackbarService: SnackbarService
    ,private userSer:UserService,private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private dialogRef:MatDialogRef<UserComponent>){} 

//name: any;
//montmensuel : any;
userId:any = 0

userForm: any = FormGroup;
responseMessage: any;
@Input() dep: any
onAddForm = new EventEmitter();
onEditForm = new EventEmitter();
dialogAction:any ="Ajout";
action:any ="Ajout";


ngOnInit(): void {
 if (this.userId == 0){
  this.userForm = this.formBuilder.group({
  name:['',[Validators.required]],
  email :['',[Validators.required]],
  password :['',[Validators.required]],
  role :['',[Validators.required]]
  })

}else {
  this.userForm = this.formBuilder.group({
    name:['',[Validators.required]],
    email :['',[Validators.required]],
    password :[''],
    role :['',[Validators.required]]
    })
}
  if(this.dialogData.action === "Modification"){
    this.dialogAction = "Modification";
    this.action = "Update";
    this.userId = 1
    this.userForm.patchValue(this.dialogData.data);


    console.log(this.dialogData.data)
  }
  //this.fraisId = this.dep.id
  //this.fraisForm.name = this.dep.name
  //this.fraisForm.montmensuel  = this.dep.montmensuel 
}

addUser(){
  //console.log(localStorage.getItem('adresse'))
  this.ngxService.start()
  var formData = this.userForm.value;
  var data ={
      name:formData.name,
      email :formData.email,
      password:formData.password,
      role: formData.role
    }
    console.log(data)
    if(this.userForm.valid){
    this.userSer.signup(data).subscribe((response:any)=>{
      
     /// this.cookie.set("jwt",response.message)
     this.onAddForm.emit();
     this.dialogRef.close();
      //this.router.navigate(['/frais']);
      this.ngxService.stop()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User enregistré avec succès",
        showConfirmButton: false,
        timer: 1500
      });
      //console.log(this.cookie.get("jwt"))
    },(error)=>{
      this.dialogRef.close();
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

edit(){
  this.ngxService.start()
  var formData = this.userForm.value;
  var data ={
    name:formData.name,
    email :formData.email,
    password:formData.password,
    role: formData.role
  }
  //console.log(this.dialogData.data.id);
  this.userSer.update(this.dialogData.data.id,data).subscribe((response:any)=>{
     this.dialogRef.close();
     this.onEditForm.emit();
     Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User mise à jour avec succès",
      showConfirmButton: false,
      timer: 1500
    });
  },(error:any)=>{
    this.dialogRef.close();
    if(error.error?.message){
      this.responseMessage = error.error?.message;

    }else{
      this.ngxService.stop()

      this.responseMessage = GlobalConstants.genericError;
    }
    this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    this.ngxService.stop()
  })
}

}


