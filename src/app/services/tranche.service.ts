import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TrancheService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl

  add(data: any) {
    return this.httpClient.post(this.url+
      "/api/tranche", data, {
      headers: new HttpHeaders().set('Content-type',"application/json")
    });
  }

  get(){
    return this.httpClient.get(this.url+ "/api/tranche")
  }

  update(id:any,data:any){
    return this.httpClient.patch(this.url+"/api/tranche/"+id,data,{
     // headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/api/tranche/"+id,{
     headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  getCurrentData(id:any){
    return this.httpClient.get(this.url+"/api/frais/"+id,{

    })
  }


}

