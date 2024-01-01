import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

name:any = localStorage.getItem('name')

  constructor ( private router: Router){}

  logout(){
   
    swal.fire({
      title: 'Voulez-vous quitter l\'application?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#00c292',
      cancelButtonColor: '#d33',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['/']);
      } 
    })
  }
}
