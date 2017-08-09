import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { AdoptarDetallePage } from '../adoptar-detalle/adoptar-detalle';

/*
  Generated class for the Adoptar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-adoptar',
  templateUrl: 'adoptar.html'
})
export class Adoptar {

	 perroList: any;
   loadedperroList: any;
   perro : any;
   perros: Array<any>;
   usuariox:any;
      constructor(public navCtrl: NavController,public http: Http, public navParams: NavParams) {
        this.usuariox = navParams.get("usuario");
		      var url = 'http://entornodepre.com/abandonocero/web/Inventia/Adopta/';
			       this.http.get(url).map(res => res.json()).subscribe(
			            data => {
				                this.perros = data;
				                this.perroList = this.perros;
		       });

	     }

	initializeItems(){
    this.perroList = this.perros;
  }

	getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
  }

  this.perroList = this.perros.filter((v) => {
      if(v.Name && q) {
        if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.perroList.length);

  }

  clicked(index, perro){
		   this.navCtrl.push(AdoptarDetallePage,{perrox: perro,usuario: this.usuariox});
  }


}
