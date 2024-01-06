import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class StagiaireService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl

  add(data: any) {
    return this.httpClient.post(this.url+
      "/api/stagiaire", data, {
      headers: new HttpHeaders().set('Content-type',"application/json")
    });
  }

  get(){
    return this.httpClient.get(this.url+ "/api/stagiaire")
  }

  getStageFor(){
    return this.httpClient.get(this.url+ "/api/stagiaire/formation")
  }

  update(id:any,data:any){
    return this.httpClient.patch(this.url+"/api/stagiaire/"+id,data,{
     // headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/api/stagiaire/"+id,{
     headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }



  getCurrentData(id:any){
    return this.httpClient.get(this.url+"/api/stagiaire/fiche/"+id,{

    })
  }


}

