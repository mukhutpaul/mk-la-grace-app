import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  
    constructor(private httpClient: HttpClient) { }
    url = environment.apiUrl
  
    addFormation(data: any) {
      return this.httpClient.post(this.url+
        "/api/formation", data, {
        headers: new HttpHeaders().set('Content-type',"application/json")
      });
    }
  
    get(){
      return this.httpClient.get(this.url+ "/api/formation")
    }
  
    update(id:any,data:any){
      return this.httpClient.patch(this.url+"/api/formation/"+id,data,{
       // headers: new HttpHeaders().set('Content-type',"application/json")
  
      })
    }
  
    delete(id:any){
      return this.httpClient.delete(this.url+"/api/formation/"+id,{
       headers: new HttpHeaders().set('Content-type',"application/json")
  
      })
    }
  
    getCurrentData(id:any){
      return this.httpClient.get(this.url+"/api/formation/"+id,{
  
      })
    }
  
  

}
