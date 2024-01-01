import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EditFraisComponent } from 'src/app/Formulaires/edit-frais/edit-frais.component';
import { FFraisComponent } from 'src/app/Formulaires/ffrais/ffrais.component';
import { FraisService } from 'src/app/services/frais.service';
import { GlobalConstants } from 'src/app/services/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.css']
})
export class FraisComponent implements OnInit{
  constructor( private ngxService : NgxUiLoaderService,private toastr: ToastrService,
  private snackbarService: SnackbarService
  ,  private userFrais:FraisService,private dialog:MatDialog, private router:Router){
    
  }
  responseMessage: any;
  dataSource: any;
  titre:any=""
  fr:any
  role:any = localStorage.getItem('role')
  ActivateAddEditFrComp:Boolean =false

  @ViewChild(MatPaginator) paginator: MatPaginator  = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort  = <MatSort>{}
  displayedColumns:string[]=['name','montmensuel','edit'];


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
      this.userFrais.getFrais().subscribe((response:any)=>{
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

 

    editfrais(value:any){
      const dialogRef = this.dialog.open(EditFraisComponent,
      { 
      data: value, 
      width: '500px', 
      }); 

      this.router.events.subscribe(()=>{
        dialogRef.close();
        
      });
    
  }


    addfrais(){
    const dialogRef = this.dialog.open(FFraisComponent,
    {  
    width: '550px', 
    }); 

    this.router.events.subscribe(()=>{
      dialogRef.close();
      
    });
  
}



handleAddAction(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data={
    action:"Ajout"
  }
  dialogConfig.width="850px";
  const dialogRef = this.dialog.open(FFraisComponent,dialogConfig);

  this.router.events.subscribe(()=>{
    dialogRef.close();
    
  });

  const sub = dialogRef.componentInstance.onAddFrais.subscribe((response)=>{
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
  const dialogRef = this.dialog.open(FFraisComponent,dialogConfig);

  this.router.events.subscribe(()=>{
    dialogRef.close();
  });

  const sub = dialogRef.componentInstance.onEditFrais.subscribe((response)=>{
       this.tableData();
  })

}

applyFilter(event:Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
}

deleteFr(id:any){
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
      this.userFrais.delete(id).subscribe((response:any)=>{
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

}
