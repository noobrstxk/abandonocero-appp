import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { AlbergueDetallePage } from '../albergue-detalle/albergue-detalle';

/*
  Generated class for the Albergues page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-albergues',
  templateUrl: 'albergues.html'
})
export class Albergues {

  albergues: Array<any>;
  alberguesList: any;
  coordenadas: any;


  lat: number = 27.982349;
  lng: number =  -15.378738;



  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
			var url = 'http://entornodepre.com/abandonocero/web/Inventia/Albergues/';
			this.http.get(url).map(res => res.json()).subscribe(
			data => {
				this.albergues = data;
				this.alberguesList = this.albergues;
				this.coordenadas = this.albergues.map(a =>{return {Lat: parseFloat(a.Lat), Lon: parseFloat(a.Lon)};});
				console.log(this.coordenadas);
			});
  }


	initializeItems(){
		this.alberguesList = this.albergues;
	}

	getItems(searchbar) {
       this.initializeItems();

    var q = searchbar.srcElement.value;



    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.alberguesList = this.albergues.filter((v) => {
      if(v.Name && q) {
        if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.alberguesList.length);

  }

  clicked(index, albergue){
		   this.navCtrl.push(AlbergueDetallePage,{alberguex: albergue});
  }

}
