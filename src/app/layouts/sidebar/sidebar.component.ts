import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import "select2";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,AfterViewInit{

  role: any = localStorage.getItem('role')

  // Get the container element
ngAfterViewInit(){
    $(function(){
      $("li").click(function(){
      $("li").removeClass("active");
      $(this).addClass("active");
      });
    });
  }

 
  ngOnInit(): void {
    $('.nav li').click(function() {
      $('.nav li').removeClass('active');
      $(this).addClass('active');
});
  
  }

}
