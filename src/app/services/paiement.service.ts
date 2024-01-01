import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl

  add(data: any) {
    return this.httpClient.post(this.url+
      "/api/paiement", data, {
      headers: new HttpHeaders().set('Content-type',"application/json")
    });
  }

  get(){
    return this.httpClient.get(this.url+ "/api/paiement")
  }

  getPaieMensuel(){
    return this.httpClient.get(this.url+ "/api/paiement/mensuel")
  }

  getJour(){
    return this.httpClient.get(this.url+ "/api/paiement/jour")
  }

  update(id:any,data:any){
    return this.httpClient.patch(this.url+"/api/paiement/"+id,data,{
     // headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/api/paiement/"+id,{
     headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

 getById(id:any){
    return this.httpClient.get(this.url+"/api/paiement/"+id,{
     headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  getCurrentData(id:any){
    return this.httpClient.get(this.url+"/api/paiement/"+id,{

    })
  }


}
