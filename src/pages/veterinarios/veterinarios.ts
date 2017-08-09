import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { VeterinariosDetallePage } from '../veterinarios-detalle/veterinarios-detalle';

/*
  Generated class for the Veterinarios page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-veterinarios',
  templateUrl: 'veterinarios.html'
})
export class Veterinarios {

	veterinarios: Array<any>;
    veterinariosList: any;
    coordenadas: any;

	 lat: number = 27.982349;
     lng: number =  -15.378738;



   constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
	var url = 'http://entornodepre.com/abandonocero/web/Inventia/Veterinarios/';
			this.http.get(url).map(res => res.json()).subscribe(
				data => {
				this.veterinarios = data;
				this.veterinariosList = this.veterinarios;
				this.coordenadas = this.veterinarios.map(a =>{return {Lat: parseFloat(a.Lat), Lon: parseFloat(a.Lon)};});
				});

   }

  ionViewDidLoad() {

			}


   initializeItems(){
		this.veterinariosList = this.veterinarios;
	}

	getItems(searchbar) {
       this.initializeItems();

		var q = searchbar.srcElement.value;



		// if the value is an empty string don't filter the items
		if (!q) {
		  return;
		}

		this.veterinariosList = this.veterinarios.filter((v) => {
		  if(v.Name && q) {
			if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
			  return true;
			}
			return false;
		  }
		});

		console.log(q, this.veterinariosList.length);

	  }

  clicked(index, veterinario){
		   this.navCtrl.push(VeterinariosDetallePage,{veterinariox: veterinario});
  }

}
