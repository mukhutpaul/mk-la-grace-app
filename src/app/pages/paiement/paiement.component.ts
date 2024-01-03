import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AddEditPaiementComponent } from 'src/app/Formulaires/add-edit-paiement/add-edit-paiement.component';
import { GlobalConstants } from 'src/app/services/global-constants';
import { PaiementService } from 'src/app/services/paiement.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import Swal from 'sweetalert2';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { NgFor } from '@angular/common';
import { forEach } from '@angular-devkit/schematics';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit{
  constructor( private ngxService : NgxUiLoaderService,private toastr: ToastrService,
  private snackbarService: SnackbarService
  ,  private paiementService: PaiementService,private dialog:MatDialog, private router:Router){
    
  }
  responseMessage: any;
  dataSource: any;
  titre:any=""
  fr:any
  datarecu:any
  ActivateAddEditFrComp:Boolean =false
  role:any = localStorage.getItem('role')

  @ViewChild(MatPaginator) paginator: MatPaginator  = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort  = <MatSort>{}
  displayedColumns:string[]=['id','stagiaire','formation','datePaie','montant','tranche','edit'];


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
      this.paiementService.get().subscribe((response:any)=>{
        this.dataSource =  new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.ngxService.stop()
        console.log(this.dataSource)
        console.log(this.dataSource.MatTableDataSource)
        
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
  const dialogRef = this.dialog.open(AddEditPaiementComponent,dialogConfig);

  this.router.events.subscribe(()=>{
    dialogRef.close();
    
  });

  const sub = dialogRef.componentInstance.onAddPaie.subscribe((response)=>{
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
  const dialogRef = this.dialog.open(AddEditPaiementComponent,dialogConfig);

  this.router.events.subscribe(()=>{
    dialogRef.close();
  });

  const sub = dialogRef.componentInstance.onEditPaie.subscribe((response)=>{
       this.tableData();
  })

}

applyFilter(event:Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filteredData.stagiaire.name.filter = filterValue.trim().toLocaleLowerCase();
  console.log(this.dataSource)
}

deletePaie(id:any){
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
      this.paiementService.delete(id).subscribe((response:any)=>{
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
recu(id:any){
  this.paiementService.getById(id).subscribe((response:any)=>{
    this.datarecu = response
    console.log(this.datarecu)
    var docDefinition:any = {
      // a string or { width: number, height: number }
      pageSize: 'A8',
    
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'portrait',
      header:{ columns: [
        { text: 'Centre De Formation Mk-La Grâce', alignment: 'center',italics: true,bold:true,fontSize:14,
        //fontFamily: 'Roboto',
        //decoration: 'underline',
      },
      ],
       
      },

      footer: {
        margin: [10, 0, 10, 0],
        columns: [
          { text: 'Adresse : 10ème rue Limete Résidentiel,Réf : Foleco', alignment: 'center',italics: true,bold:true,fontSize:10 }
        ]
      },
      content: [
        
        
       
            
            {text: 'N° paiement : '+response.id+'\nN° Stagiaire : '+response.stagiaire.id+'\nNom : '+response.stagiaire.name+"\nPost-Nom : "+response.stagiaire.postnom+"\n Prenom : "+response.stagiaire.prenom
            +"\n Date : "+response.datePaie+"\n Montant : "+response.montant+" $"+"\n Formation : "+response.formation.title+"\n Motif : "+response.tranche.name+"\n Caissier : "+localStorage.getItem('name'),
          alignment:'left',fontSize:7},
            
          {qr:'N° paiement : '+response.id+'\nN° Stagiaire : '+response.stagiaire.id+'\nNom : '+response.stagiaire.name+"\nPost-Nom : "+response.stagiaire.postnom+"\n Prenom : "+response.stagiaire.prenom
          +"\n Date : "+response.datePaie+"\n Montant : "+response.montant+" $"+"\n Formation : "+response.formation.title+"\n Motif : "+response.tranche.name+"\n Caissier : "+localStorage.getItem('name'),fit:'50',alignment: 'center'}
       
      ],
    
      
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [ 10, 40, 5, 30 ],
                 
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
