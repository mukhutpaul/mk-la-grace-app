import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/services/global-constants';
import { PaiementService } from 'src/app/services/paiement.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor( private ngxService : NgxUiLoaderService,private toastr: ToastrService,
    private stageServ : StagiaireService,private snackbarService: SnackbarService,
    private servPaie: PaiementService,private router: Router){}
    dataSource: any
    paiejour: any = 0
    paie: any
    responseMessage: any
    tab : Array<String> =[]
  ngOnInit(): void {
     if(localStorage.getItem('role')==null){
      this.router.navigate(['/']);
     }
     this.home()
     this.PaieMensuel()
     this.PaieJour()
    }

  home(){
    //console.log(localStorage.getItem('adresse'))
    this.ngxService.start()
      this.stageServ.getStageFor().subscribe((response:any)=>{
        this.dataSource =  response
        console.log( this.dataSource)
        var data = {
          element:response[0]
        }
        console.log(data)
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

    PaieMensuel(){
      //console.log(localStorage.getItem('adresse'))
      this.ngxService.start()
        this.servPaie.getPaieMensuel().subscribe((response:any)=>{
          this.paie =  response
          console.log(this.paie)
        
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

      PaieJour(){
        //console.log(localStorage.getItem('adresse'))
        this.paiejour =0
        this.ngxService.start()
          this.servPaie.getJour().subscribe((response:any)=>{
            this.paiejour =  response
            console.log(this.paiejour)
          
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

}
