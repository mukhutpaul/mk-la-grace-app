import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/services/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TrancheService } from 'src/app/services/tranche.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-tranche',
  templateUrl: './add-edit-tranche.component.html',
  styleUrls: ['./add-edit-tranche.component.css']
})

export class AddEditTrancheComponent implements OnInit{


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngxService :NgxUiLoaderService,
    private snackbarService: SnackbarService
    ,private trancheService:TrancheService,private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private dialogRef:MatDialogRef<AddEditTrancheComponent>){} 

//name: any;
//montmensuel : any;
fraisId:any = 0

formTranche: any = FormGroup;
responseMessage: any;
@Input() dep: any
onAddTranche = new EventEmitter();
onEditTranche = new EventEmitter();
dialogAction:any ="Ajout";
action:any ="Ajout";


ngOnInit(): void {

  this.formTranche = this.formBuilder.group({
  name:['',[Validators.required]],
  
  })
  if(this.dialogData.action === "Modification"){
    this.dialogAction = "Modification";
    this.action = "Update";
    this.fraisId = 1
    this.formTranche.patchValue(this.dialogData.data);

    console.log(this.dialogData.data)
  }
  //this.fraisId = this.dep.id
  //this.fraisForm.name = this.dep.name
  //this.fraisForm.montmensuel  = this.dep.montmensuel 
}

addTranche(){
  //console.log(localStorage.getItem('adresse'))
  this.ngxService.start()
  var formData = this.formTranche.value;
  var data ={
      name:formData.name,
    }
    console.log(data)
    if(this.formTranche.valid){
    this.trancheService.add(data).subscribe((response:any)=>{
      
     /// this.cookie.set("jwt",response.message)
     this.onAddTranche.emit();
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
  var formData = this.formTranche.value;
  var data ={
    name:formData.name,
  }
  //console.log(this.dialogData.data.id);
  this.trancheService.update(this.dialogData.data.id,data).subscribe((response:any)=>{
     this.dialogRef.close();
     this.onEditTranche.emit();
     Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Tranche mise à jour avec succès",
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


