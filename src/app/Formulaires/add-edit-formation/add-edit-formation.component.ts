import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormationComponent } from 'src/app/pages/formation/formation.component';
import { FormationService } from 'src/app/services/formation.service';
import { FraisService } from 'src/app/services/frais.service';
import { GlobalConstants } from 'src/app/services/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-formation',
  templateUrl: './add-edit-formation.component.html',
  styleUrls: ['./add-edit-formation.component.css']
})

export class AddEditFormationComponent implements OnInit{


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngxService :NgxUiLoaderService,
    private snackbarService: SnackbarService
    ,private formService:FormationService,private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private dialogRef:MatDialogRef<FormationComponent>){} 

//name: any;
//montmensuel : any;
fraisId:any = 0

formForm: any = FormGroup;
responseMessage: any;
@Input() dep: any
onAddForm = new EventEmitter();
onEditForm = new EventEmitter();
dialogAction:any ="Ajout";
action:any ="Ajout";


ngOnInit(): void {

  this.formForm = this.formBuilder.group({
  title:['',[Validators.required]],
  coutformation :['',[Validators.required]],
  duree :['',[Validators.required]]
  })
  if(this.dialogData.action === "Modification"){
    this.dialogAction = "Modification";
    this.action = "Update";
    this.fraisId = 1
    this.formForm.patchValue(this.dialogData.data);

    console.log(this.dialogData.data)
  }
  //this.fraisId = this.dep.id
  //this.fraisForm.name = this.dep.name
  //this.fraisForm.montmensuel  = this.dep.montmensuel 
}

addForm(){
  //console.log(localStorage.getItem('adresse'))
  this.ngxService.start()
  var formData = this.formForm.value;
  var data ={
      title:formData.title,
      coutformation :formData.coutformation,
      duree:formData.duree
    }
    console.log(data)
    if(this.formForm.valid){
    this.formService.addFormation(data).subscribe((response:any)=>{
      
     /// this.cookie.set("jwt",response.message)
     this.onAddForm.emit();
     this.dialogRef.close();
      //this.router.navigate(['/frais']);
      this.ngxService.stop()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Frais enregistré avec succès",
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
  var formData = this.formForm.value;
  var data ={
    title:formData.title,
    coutformation :formData.coutformation,
    duree:formData.duree
  }
  //console.log(this.dialogData.data.id);
  this.formService.update(this.dialogData.data.id,data).subscribe((response:any)=>{
     this.dialogRef.close();
     this.onEditForm.emit();
     Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Frais mise à jour avec succès",
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

