import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

export interface Account{
    user: string,
    password: string
}

@Injectable()
export class UserService {

  constructor(private http: Http){}
  fetch():Account{
      let val = window.localStorage["user-account"];
      if (val)
          return JSON.parse(val);
      else
          return {user:'', password:''};
  }

  store(account: Account){
      window.localStorage["user-account"] = JSON.stringify(account);
  }

  connect(code: string){
      let account = this.fetch();
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.post("http://www3.gobiernodecanarias.org/educacion/9/PEKWEB/Ekade/Movil/", `username=${account.user}&password=${account.password}&captcha=${code}`, options)
      .toPromise();
  }

}
