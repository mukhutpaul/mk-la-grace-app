import { DatePipe, formatDate } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormationService } from 'src/app/services/formation.service';
import { GlobalConstants } from 'src/app/services/global-constants';
import { PaiementService } from 'src/app/services/paiement.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { TrancheService } from 'src/app/services/tranche.service';
import Swal from 'sweetalert2';

import * as $ from "jquery";
import "select2";


@Component({
  selector: 'app-add-edit-paiement',
  templateUrl: './add-edit-paiement.component.html',
  styleUrls: ['./add-edit-paiement.component.css'],
  providers: [DatePipe]
})

export class AddEditPaiementComponent implements OnInit,AfterViewInit{
  a:any
  ngAfterViewInit() {
    // Use jQuery to select the element and initialize Select2
    $(".sear").select2();
    $("#sear2").select2();
    $("#sear3").select2();
    this.a = $(".sear").val()
   
    }


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngxService :NgxUiLoaderService,
    private snackbarService: SnackbarService
    ,private paieServe:PaiementService,private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private dialogRef:MatDialogRef<AddEditPaiementComponent>
    ,private datePipe: DatePipe,
    private stageServe:StagiaireService,private tranchServ:TrancheService,private formServ:FormationService){} 

//name: any;
//montmensuel : any;
fraisId:any = 0
maDate = new Date();
formP: any = FormGroup;
responseMessage: any;
@Input() dep: any
onAddPaie = new EventEmitter();
onEditPaie = new EventEmitter();
dialogAction:any ="Ajout";

action:any ="Ajout";

formations:any;
tranches:any;
stagiaires:any;
private _formations: Array<any>=[];

 date = new Date();

ngOnInit(): void {


  console.log(this.datePipe.transform(this.maDate, 'dd/MM/yyyy H:M:S'))
  this.formP = this.formBuilder.group({
  stagiaire:['',[Validators.required]],
  formation:['',[Validators.required]],
  //datePaie:['',[Validators.required,Validators.pattern(GlobalConstants.dateRegex)]],
  montant:['',[Validators.required,Validators.maxLength(3),Validators.pattern(GlobalConstants.numericRegex)]],
  tranche:['',[Validators.required]],
  mois:['',[Validators.required]],

 
  })
  if(this.dialogData.action === "Modification"){
    this.dialogAction = "Modification";
    this.action = "Update";
    this.fraisId = 1
    this.formP.patchValue({
      stagiaire: this.dialogData.data.stagiaire.id,
      formation:this.dialogData.data.formation.id,
      datePaie: this.dialogData.data.datePaie,
      montant:this.dialogData.data.montant,
      tranche:this.dialogData.data.tranche.id,
      mois:this.dialogData.data.mois   
    });

    console.log(this.dialogData.data)
    
  }
  this.getFormations()
  this.getStagiaires()
  this.getTranches()

}

addPaie(){
  //console.log(localStorage.getItem('adresse'))
  this.ngxService.start()
  var formData = this.formP.value;
 
  var data ={
      stagiaire: {"id":formData.stagiaire},
      formation: {"id":formData.formation},
      datePaie:this.datePipe.transform(this.maDate, 'dd/MM/yyyy H:M:S'),
      montant: formData.montant,
      tranche: {"id":formData.tranche},
      mois: formData.mois

    }
    
    console.log(data)
    if(this.formP.valid){
    this.paieServe.add(data).subscribe((response:any)=>{
      
     this.onAddPaie.emit();
     this.dialogRef.close();

    this.ngxService.stop()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Paiement enregistré avec succès",
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
  var formData = this.formP.value;
  var data ={
    stagiaire: {"id":formData.stagiaire},
    formation: {"id":formData.formation},
    datePaie:formData.datePaie,
    montant: formData.montant,
    tranche: {"id":formData.tranche.id},
    mois:formData.mois
  }

  console.log(this.dialogData.data.id);
  this.paieServe.update(this.dialogData.data.id,data).subscribe((response:any)=>{
     this.dialogRef.close();
     this.onEditPaie.emit();
     Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Paiement mise à jour avec succès",
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

  getTranches(){
    //console.log(localStorage.getItem('adresse'))
      this.tranchServ.get().subscribe((response:any)=>{
        this.tranches =  response
        console.log(this.tranches)   
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




