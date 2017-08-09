import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { PagePerros } from '../page-perros/page-perros';

/*
  Generated class for the PreferenciaDetalle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-preferencia-detalle',
  templateUrl: 'preferencia-detalle.html'
})
export class PreferenciaDetallePage {
		  public firstParam:any;
      public distancia:any;
			notes: any = [];
			id: any;
      public edad:any;
      usuario:any;
  constructor(public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController) {
	  this.firstParam = params.get("firstPassed");
    this.distancia = params.get("distancia");
    this.edad = params.get("edad");
    this.usuario = params.get("usuario");
	  this.id = this.firstParam;
	  console.log(this.id);
    console.log(this.distancia);
    console.log(this.edad);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferenciaDetallePage');
  }



openPagePerros(page) {
  console.log(this.edad);
   this.navCtrl.push(PagePerros,{firstPassed: this.id,distancia: this.distancia,usuario: this.usuario,edad: this.edad});
  }





}
