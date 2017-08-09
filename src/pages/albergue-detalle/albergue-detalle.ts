import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AlbergueDetalle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-albergue-detalle',
  templateUrl: 'albergue-detalle.html'
})
export class AlbergueDetallePage {

	public alberguex:any;

  title: string = 'My first angular2-google-maps project';

  lat: number;
  lng: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.alberguex = navParams.get("alberguex");
   this.lat = parseFloat(this.alberguex.Lat);
   this.lng = parseFloat(this.alberguex.Lon);
  }

  ionViewDidLoad() {
   console.log(this.alberguex);
   console.log(this.alberguex.Lat);
   console.log(this.alberguex.Lon);
  }

}
