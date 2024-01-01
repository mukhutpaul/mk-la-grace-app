import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private cookie:CookieService) { }

  public isAuthenticated(): boolean{
    const token = this.cookie.get('jwt') as string;
    if(!token){
     this.router.navigate(['/']);
     return false;
    }
    else{
     return true;
    }
 }
}
