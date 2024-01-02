import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AddEditStagiaireComponent } from 'src/app/Formulaires/add-edit-stagiaire/add-edit-stagiaire.component';
import { FormationService } from 'src/app/services/formation.service';
import { GlobalConstants } from 'src/app/services/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import Swal from 'sweetalert2';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: 'app-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.css']
})
export class StagiaireComponent implements OnInit{
  constructor( private ngxService : NgxUiLoaderService,private toastr: ToastrService,
  private snackbarService: SnackbarService
  ,  private stagiaireService: StagiaireService,private dialog:MatDialog, private router:Router){
    
  }
  responseMessage: any;
  dataSource: any;
  titre:any=""
  fr:any
  role:any = localStorage.getItem('role')
  ActivateAddEditFrComp:Boolean =false

  @ViewChild(MatPaginator) paginator: MatPaginator  = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort  = <MatSort>{}
  displayedColumns:string[]=['name','postnom','prenom','sexe','formation','edit'];
  dataStage :any

  ngOnInit(): void {
    if(localStorage.getItem('role')==null){
      this.router.navigate(['/']);
     }
    this.tableData()
    //this.toastr.success('ça marche!!');
  
    }



  tableData(){
    //console.log(localStorage.getItem('adresse'))
    this.ngxService.start()
      this.stagiaireService.get().subscribe((response:any)=>{
        this.dataSource =  new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.ngxService.stop()
        
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

 

handleAddAction(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data={
    action:"Ajout"
  }
  dialogConfig.width="850px";
  const dialogRef = this.dialog.open(AddEditStagiaireComponent,dialogConfig);

  this.router.events.subscribe(()=>{
    dialogRef.close();
    
  });

  const sub = dialogRef.componentInstance.onAddStage.subscribe((response)=>{
        this.tableData();
  })

}



handleEditAction(values:any){

  const dialogConfig = new MatDialogConfig();
  dialogConfig.data={
    action:"Modification",
    data:values
  }
  dialogConfig.width="850px";
  const dialogRef = this.dialog.open(AddEditStagiaireComponent,dialogConfig);

  this.router.events.subscribe(()=>{
    dialogRef.close();
  });

  const sub = dialogRef.componentInstance.onEditStage.subscribe((response)=>{
       this.tableData();
  })

}

applyFilter(event:Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
}

deleteFor(id:any){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Es-tu sûr de supprimer?",
    text: "Tu seras pas capable de revoir ça!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Oui",
    cancelButtonText: "Non",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.stagiaireService.delete(id).subscribe((response:any)=>{
        this.responseMessage = response?.message;
        this.tableData();
        this.snackbarService.openSnackBar(this.responseMessage,"success");
     },(error:any)=>{ 
      console.log(error);
       if(error.error?.message){
         this.responseMessage = error.error?.message;
       }else{
        this.responseMessage = GlobalConstants.genericError;
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
     })
      swalWithBootstrapButtons.fire({
        title: "Supprimer!",
        text: "La ligne a été supprimée avec succès.",
        icon: "success"
        
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Annuler",
        text: "Merci de n'avoir pas supprimé",
        icon: "error"
      });
    }
  });
 
  
}

fiche(id:any){
  this.stagiaireService.getCurrentData(id).subscribe((response:any)=>{
    this.dataStage = response
    console.log(this.dataStage)
    var docDefinition:any = {
      // a string or { width: number, height: number }
      pageSize: 'A4',
    
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'portrait',
      header:{ columns: [
        { text: 'Centre De Formation Professionnelle  Mk-La Grâce ', alignment: 'center',italics: true,bold:true,fontSize:20,
        //fontFamily: 'Roboto',
        //decoration: 'underline',
        
      },
      {text:"Kinshasa, le "+response.dateInscription,alignment:'center',margin:[25,10,10,10],fontSize:20},
      ],
      },

      footer: {
        margin: [10, 0, 10, 0],
        columns: [
          { text: 'Adresse : 10ème rue Limete Résidentiel,Réf : Foleco', alignment: 'center',italics: true,bold:true,fontSize:10 }
        ]
      },
      content: [
        {text:"FICHE D'INSCRIPTION",alignment:'center',margin:[25,10,10,10],fontSize:20},
        
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
            margin:[10,10,10,10],
            body: [
              [ 'ETIQUETTES', 'DONNEES','',''],
              [ 'Numéro d\'ordre',': '+response.id, '', '' ],
              [ 'Nom stagiaire', ': '+response.name, '', '' ],
              [ 'Post-nom stagiaire',': '+ response.postnom, '', '' ],
              [ 'Prenom stagiaire ', ': '+response.prenom, '', '' ],
              [ 'Lieu de naissance',': '+ response.lieuNais, '', '' ],
              [ 'Date de naissance ',': '+response.datenais, '', '' ],
              [ 'Sexe',': '+ response.sexe, '', '' ],
              [ 'Etat-civil',': '+response.etatCivil, '', '' ],
              [ 'Niveau d\'étude ',': '+response.niveau_etude, '', '' ],
              [ 'Adresse physique ',': '+response.adresse, '', '' ],
              [ 'Téléphone',': '+response.telephone, '', '' ],
              [ 'Adresse email ',': '+response.email, '', '' ],
              [ 'Langue parlée',': '+response.langue_parle, '', '' ],
              [ 'Jours de formation',': '+ response.jours, '', '' ],
              [ 'Date d\'inscription ',': '+response.dateInscription, '', '' ],
              [ 'Formation sollicitée',': '+response.formation.title, '', '' ],
              

              
            ],

            
          }
        },
        {text:"Signature du stagiaire",alignment:'right',margin:[25,80,10,10],fontSize:20},

        {text: response.name+" "+ response.postnom+" "+response.prenom,alignment:'right',margin:[25,20,10,10],fontSize:20},
      ],
      
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [ 50, 60, 50, 30 ],
                 
       };
  
    pdfMake.createPdf(docDefinition).open(); 
    
  },(error:any)=>{ 
    console.log(error);
     if(error.error?.message){
       this.responseMessage = error.error?.message;
     }else{
      this.responseMessage = GlobalConstants.genericError;
     }
     this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
   })
  } 
}
