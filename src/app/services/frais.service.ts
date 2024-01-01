import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FraisService {
  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl

  addFrais(data: any) {
    return this.httpClient.post(this.url+
      "/api/frais", data, {
      headers: new HttpHeaders().set('Content-type',"application/json")
    });
  }

  getFrais(){
    return this.httpClient.get(this.url+ "/api/frais")
  }

  update(id:any,data:any){
    return this.httpClient.patch(this.url+"/api/frais/"+id,data,{
     // headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/api/frais/"+id,{
     headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  getCurrentData(id:any){
    return this.httpClient.get(this.url+"/api/frais/"+id,{

    })
  }


}
