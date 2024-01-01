import { Component,  EventEmitter,  Inject,  Input,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FraisService } from 'src/app/services/frais.service';
import { GlobalConstants } from 'src/app/services/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ffrais',
  templateUrl: './ffrais.component.html',
  styleUrls: ['./ffrais.component.css']
})
export class FFraisComponent implements OnInit{


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngxService :NgxUiLoaderService,
    private snackbarService: SnackbarService
    ,private fraisService:FraisService,private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private dialogRef:MatDialogRef<FFraisComponent>){} 

//name: any;
//montmensuel : any;
fraisId:any = 0

fraisForm: any = FormGroup;
responseMessage: any;
@Input() dep: any
onAddFrais = new EventEmitter();
onEditFrais = new EventEmitter();
dialogAction:any ="Ajout";
action:any ="Ajout";


ngOnInit(): void {

  this.fraisForm = this.formBuilder.group({
  name:['',[Validators.required]],
  montmensuel :['',[Validators.required]]
  })
  if(this.dialogData.action === "Modification"){
    this.dialogAction = "Modification";
    this.action = "Update";
    this.fraisId = 1
    this.fraisForm.patchValue(this.dialogData.data);

    console.log(this.dialogData.data)
  }
  //this.fraisId = this.dep.id
  //this.fraisForm.name = this.dep.name
  //this.fraisForm.montmensuel  = this.dep.montmensuel 
}

addFrais(){
  //console.log(localStorage.getItem('adresse'))
  this.ngxService.start()
  var formData = this.fraisForm.value;
  var data ={
      name:formData.name,
      montmensuel:formData.montmensuel
    }
    if(this.fraisForm.valid){
    this.fraisService.addFrais(data).subscribe((response:any)=>{
      
     /// this.cookie.set("jwt",response.message)
     this.onAddFrais.emit();
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
  var formData = this.fraisForm.value;
  var data ={
    name:formData.name,
    montmensuel:formData.montmensuel
  }
  console.log(this.dialogData.data.id);
  this.fraisService.update(this.dialogData.data.id,data).subscribe((response:any)=>{
     this.dialogRef.close();
     this.onEditFrais.emit();
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
