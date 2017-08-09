import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Datamembers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Datamembers {

  constructor(public http: Http) {
  }

  Iniciar(pass,email) {
    var url = 'http://entornodepre.com/abandonocero/web/Inventia/Userx/login?&email='+email+'&pass='+pass;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }



  InsertMember(email,pass,edad,token,coordLat,coordLon)
  {
	console.log(edad);
    var url = 'http://entornodepre.com/abandonocero/web/Inventia/Userx/add?&email='+email+'&pass='+pass+'&edad='+edad+'&token='+token+'&coordLat='+coordLat+'&coordLon='+coordLon;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  AdoptarAnimal(id_u,id_a)
  {
    var url = 'http://entornodepre.com/abandonocero/web/Inventia/Userx/adoptar?&id_u='+id_u+'&id_a='+id_a;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowPreferencias(id)
  {
    var url = 'http://entornodepre.com/abandonocero/web/Inventia/Preferencias/show?id='+id;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  InsertarPreferenciaAnimal(id_u,ida,edad,distancia)
  {
    var url = 'http://entornodepre.com/abandonocero/web/Inventia/Preferencias/add?id='+id_u+'&ida='+ida+'&edad='+edad+'&Pdistancia='+distancia;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  UpdatePreferenciaAnimal(id_u,Pdistancia,edad)
  {
    var url = 'http://entornodepre.com/abandonocero/web/Inventia/Preferencias/update?id='+id_u+'&Pdistancia='+Pdistancia+'&edad='+edad;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  UpdateUser(id_u,email,pass)
  {
    var url = 'http://entornodepre.com/abandonocero/web/Inventia/Userx/update?id='+id_u+'&pass='+pass+'&email='+email;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  Recover(email)
  {
    var url = 'http://entornodepre.com/abandonocero/web/Inventia/Userx/forget?correo='+email;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }


}
