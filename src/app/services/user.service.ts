import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl

  signup(data: any) {
    console.log("hHHHH"+this.url)
    return this.httpClient.post(this.url+
      "/api/register", data, {
      headers: new HttpHeaders().set('Content-type',"application/json")
    });
  }

  forgotPassword(data:any){
     return this.httpClient.post(this.url+
      "/user/forgotPassword/",data,{
        headers: new HttpHeaders().set('Content-type',"application/json")
      })
  }
  login(data:any){
    return this.httpClient.post(this.url+
      "/api/login",data,{
       withCredentials:true
      })
  }

  checkToken(){
    return this.httpClient.get(this.url + "/user/checkToken",{
      withCredentials:true});
  }

  changePassword(data:any){
    return this.httpClient.post(this.url+
      "/user/changePassword",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      })
  }

  getUsers(){
    return this.httpClient.get(this.url+ "/api/users")
  }

  update(id:any,data:any){
    return this.httpClient.patch(this.url+"/api/users/"+id,data,{
      headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/api/users/"+id,{
      headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }


}
