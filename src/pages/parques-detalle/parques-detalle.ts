import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ParquesDetalle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-parques-detalle',
  templateUrl: 'parques-detalle.html'
})
export class ParquesDetallePage {

public parquex:any;
  lat: number;
  lng: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	    this.parquex = navParams.get("parquex");
	    this.lat = parseFloat(this.parquex.Lat);
		  this.lng = parseFloat(this.parquex.Lon);
  }

  ionViewDidLoad() {
    console.log(this.parquex);
  }

}
