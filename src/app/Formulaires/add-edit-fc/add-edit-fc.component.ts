import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FcService } from 'src/app/services/fc.service';
import { FormationService } from 'src/app/services/formation.service';
import { GlobalConstants } from 'src/app/services/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-edit-fc',
  templateUrl: './add-edit-fc.component.html',
  styleUrls: ['./add-edit-fc.component.css'],
  providers: [DatePipe]
})

export class AddEditFcComponent implements OnInit{


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngxService :NgxUiLoaderService,
    private snackbarService: SnackbarService
    ,private fcServe:FcService,private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private dialogRef:MatDialogRef<AddEditFcComponent>
    ,private datePipe: DatePipe,
    private stageServe:StagiaireService,private formServ:FormationService){} 

//name: any;
//montmensuel : any;
fcId:any = 0
maDate = new Date();
formF: any = FormGroup;
responseMessage: any;
@Input() dep: any
onAddFc = new EventEmitter();
onEditFc = new EventEmitter();
dialogAction:any ="Ajout";

action:any ="Ajout";

formations:any;
stagiaires:any;
private _formations: Array<any>=[];

date = new Date();

ngOnInit(): void {

  console.log(this.datePipe.transform(this.maDate, 'dd/MM/yyyy H:M:S'))
  this.formF = this.formBuilder.group({
  stagiaire:['',[Validators.required]],
  formation:['',[Validators.required]],
  //datePaie:['',[Validators.required,Validators.pattern(GlobalConstants.dateRegex)]],
  //montant:['',[Validators.required,Validators.maxLength(3),Validators.pattern(GlobalConstants.numericRegex)]],
  //tranche:['',[Validators.required]],
  //mois:['',[Validators.required]],

 
  })
  if(this.dialogData.action === "Modification"){
    this.dialogAction = "Modification";
    this.action = "Update";
    this.fcId = 1
    this.formF.patchValue({
      stagiaire: this.dialogData.data.stagiaire.id,
      formation:this.dialogData.data.formation.id,
      dateSous: this.dialogData.data.dateSous, 
    });

    console.log(this.dialogData.data)
    
  }
  this.getFormations()
  this.getStagiaires()

}

addFc(){
  //console.log(localStorage.getItem('adresse'))
  this.ngxService.start()
  var formData = this.formF.value;
 
  var data ={
      stagiaire: {"id":formData.stagiaire},
      formation: {"id":formData.formation},
      dateSous:this.datePipe.transform(this.maDate, 'dd/MM/yyyy H:M:S')

    }
    
    console.log(data)
    if(this.formF.valid){
    this.fcServe.add(data).subscribe((response:any)=>{
      
     this.onAddFc.emit();
     this.dialogRef.close();

    this.ngxService.stop()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Avec succès",
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
  var formData = this.formF.value;
  var data ={
    stagiaire: {"id":formData.stagiaire},
    formation: {"id":formData.formation}
  }

  console.log(this.dialogData.data.id);
  this.fcServe.update(this.dialogData.data.id,data).subscribe((response:any)=>{
     this.dialogRef.close();
     this.onEditFc.emit();
     Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Information mise à jour avec succès",
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

getFormations(){
  //console.log(localStorage.getItem('adresse'))
    this.formServ.get().subscribe((response:any)=>{
      this.formations =  response
      this._formations =  response
      console.log(this.formations)   
    },(error)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{

        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      
    })
  }

 
    getStagiaires(){
      //console.log(localStorage.getItem('adresse'))
        this.stageServe.get().subscribe((response:any)=>{
          this.stagiaires =  response
        
          console.log(this.stagiaires)   
        },(error)=>{
          if(error.error?.message){
            this.responseMessage = error.error?.message;
          }else{
    
            this.responseMessage = GlobalConstants.genericError;
          }
          this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
          
        })
      }

}





