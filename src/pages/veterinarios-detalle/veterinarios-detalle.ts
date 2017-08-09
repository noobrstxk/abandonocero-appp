import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the VeterinariosDetalle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-veterinarios-detalle',
  templateUrl: 'veterinarios-detalle.html'
})
export class VeterinariosDetallePage {
  lat: number;
  lng: number;
	public veterinariox:any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
	     this.veterinariox = navParams.get("veterinariox");
		 this.lat = parseFloat(this.veterinariox.Lat);
		 this.lng = parseFloat(this.veterinariox.Lon);
  }

  ionViewDidLoad() {
       console.log(this.veterinariox);
  }

}
