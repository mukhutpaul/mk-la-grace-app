import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  role: any = localStorage.getItem('role')
 
  ngOnInit(): void {
  
    //this.toastr.success('ça marche!!');
  
    }

}
