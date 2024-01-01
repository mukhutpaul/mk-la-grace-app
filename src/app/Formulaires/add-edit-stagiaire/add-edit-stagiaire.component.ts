import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormationService } from 'src/app/services/formation.service';
import { GlobalConstants } from 'src/app/services/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-stagiaire',
  templateUrl: './add-edit-stagiaire.component.html',
  styleUrls: ['./add-edit-stagiaire.component.css'],
  providers: [DatePipe]
})

export class AddEditStagiaireComponent implements OnInit{


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngxService :NgxUiLoaderService,
    private snackbarService: SnackbarService
    ,private stagiaireService:StagiaireService,private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private dialogRef:MatDialogRef<AddEditStagiaireComponent>
    ,private formServ: FormationService,private datePipe: DatePipe){} 

//name: any;
//montmensuel : any;
fraisId:any = 0

formStage: any = FormGroup;
responseMessage: any;
@Input() dep: any
onAddStage = new EventEmitter();
onEditStage = new EventEmitter();
dialogAction:any ="Ajout";

action:any ="Ajout";
maDate = new Date();
formations:any;
private _formations: Array<any>=[];


ngOnInit(): void {
  
  this.formStage = this.formBuilder.group({
  name:['',[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
  postnom:['',[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
  prenom:['',[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
  lieuNais:['',[Validators.required]],
  datenais:['',[Validators.required,Validators.pattern(GlobalConstants.dateRegex)]],
  sexe:['',[Validators.required]],
  etatCivil:['',[Validators.required]],
  niveau_etude:['',[Validators.required]],
  adresse:['',[Validators.required]],
  telephone:['',[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
  email:['',[Validators.pattern(GlobalConstants.emailRegex)]],
  langue_parle:['',[Validators.required]],
  jours:['',[Validators.required]],
  //dateInscription:['',[Validators.required,Validators.pattern(GlobalConstants.dateRegex)]],
  formation:['',[Validators.required]]
  })
  if(this.dialogData.action === "Modification"){
    this.dialogAction = "Modification";
    this.action = "Update";
    this.fraisId = 1
    this.formStage.patchValue({
      name: this.dialogData.data.name,
      postnom:this.dialogData.data.postnom,
      prenom: this.dialogData.data.prenom,
      lieuNais:this.dialogData.data.lieuNais,
      datenais:this.dialogData.data.datenais,
      sexe:this.dialogData.data.sexe,
      etatCivil:this.dialogData.data.etatCivil,
      niveau_etude:this.dialogData.data.niveau_etude,
      adresse:this.dialogData.data.adresse,
      telephone:this.dialogData.data.telephone,
      email:this.dialogData.data.email,
      langue_parle:this.dialogData.data.langue_parle,
      jours:this.dialogData.data.jours,
      dateInscription:this.dialogData.data.dateInscription,
      formation:this.dialogData.data.formation.id
    });

    console.log(this.dialogData.data)
    
  }
  this.getFormations()

}

addStagiaire(){
  //console.log(localStorage.getItem('adresse'))
  this.ngxService.start()
  var formData = this.formStage.value;
  var data ={
      name:formData.name,
      postnom: formData.postnom,
      prenom: formData.prenom,
      lieuNais: formData.lieuNais,
      datenais: formData.datenais,
      sexe: formData.sexe,
      etatCivil: formData.etatCivil,
      niveau_etude: formData.niveau_etude,
      adresse: formData.adresse,
      telephone: formData.telephone,
      email: formData.email,
      langue_parle: formData.langue_parle,
      jours: formData.jours,
      dateInscription: this.datePipe.transform(this.maDate, 'dd/MM/yyyy H:M:S'),
      formation: {"id":formData.formation}

    }

    console.log(data)
    if(this.formStage.valid){
    this.stagiaireService.add(data).subscribe((response:any)=>{
      
     this.onAddStage.emit();
     this.dialogRef.close();

    this.ngxService.stop()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Stagiaire enregistré avec succès",
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
  var formData = this.formStage.value;
  var data ={
      name:formData.name,
      postnom: formData.postnom,
      prenom: formData.prenom,
      lieuNais: formData.lieuNais,
      datenais: formData.datenais,
      sexe: formData.sexe,
      etatCivil: formData.etatCivil,
      niveau_etude: formData.niveau_etude,
      adresse: formData.adresse,
      telephone: formData.telephone,
      email: formData.email,
      langue_parle: formData.langue_parle,
      jours: formData.jours,
     // dateInscription: formData.dateInscription,
      formation: {"id":formData.formation}
  }
  //console.log(this.dialogData.data.id);
  this.stagiaireService.update(this.dialogData.data.id,data).subscribe((response:any)=>{
     this.dialogRef.close();
     this.onEditStage.emit();
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

}



