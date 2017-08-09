import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { ParquesDetallePage } from '../parques-detalle/parques-detalle';

/*
  Generated class for the Parques page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-parques',
  templateUrl: 'parques.html'
})
export class Parques{

	parques: Array<any>;
    parquesList: any;
   coordenadas: any;


   lat: number = 27.982349;
   lng: number =  -15.378738;


   constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
			var url = 'http://entornodepre.com/abandonocero/web/Inventia/Parques/';
			this.http.get(url).map(res => res.json()).subscribe(
			data => {
				this.parques = data;
				this.parquesList = this.parques;
				this.coordenadas = this.parques.map(a =>{return {Lat: parseFloat(a.Lat), Lon: parseFloat(a.Lon)};});
				});

   }




	initializeItems(){
		this.parquesList = this.parques;
	}

	getItems(searchbar) {
       this.initializeItems();

		var q = searchbar.srcElement.value;



		// if the value is an empty string don't filter the items
		if (!q) {
		  return;
		}

		this.parquesList = this.parques.filter((v) => {
		  if(v.Name && q) {
			if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
			  return true;
			}
			return false;
		  }
		});

		console.log(q, this.parquesList.length);

	  }

  clicked(index, parque){
		   this.navCtrl.push(ParquesDetallePage,{parquex: parque});
  }

}
