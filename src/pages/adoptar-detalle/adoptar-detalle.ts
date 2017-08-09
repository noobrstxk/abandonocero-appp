import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {Datamembers} from "../../providers/datamembers";

/*
  Generated class for the AdoptarDetalle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-adoptar-detalle',
  templateUrl: 'adoptar-detalle.html'
})
export class AdoptarDetallePage {
   public perrox:any;
   usuariox:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public data:Datamembers,public alertCtrl: AlertController,public loadingCtrl:LoadingController) {
	  this.perrox = navParams.get("perrox");
    this.usuariox = navParams.get("usuario");

    if (this.perrox.Sex == 1){
      this.perrox.Sex = "macho";
    }
    if (this.perrox.Sex == 2){
        this.perrox.Sex = "Hembra";
    }
  }


  ionViewDidLoad() {
    console.log(this.perrox.Id);
    console.log(this.usuariox.id);
  }

  public presentLoading() {
   let loading = this.loadingCtrl.create({
     content: 'Adoptando mascota!...'
   });
   loading.present();
   setTimeout(() => {
     loading.dismiss();
   }, 3000);
 }

  Adoptar() {
    if (this.usuariox == undefined) {
      let confirm = this.alertCtrl.create({
      title: '¡Regístrese Ahora!',
      message: '¡esta opción solo esta disponible para usuarios autenticados!',
      });
       confirm.present();
    }else {
    let confirm = this.alertCtrl.create({
    title: '¿Desea Adoptar ese animal?',
    message: 'este animal estaría encantado de encontrar a su nuevo dueño :)',
    buttons: [
      {
        text: 'Cancelar',
        handler: () => {
        }
      },
      {
        text: '¡Lo quiero!',
        handler: () => {
          this.data.AdoptarAnimal(this.usuariox.id,this.perrox.Id).subscribe(
                 data => {
                      console.log(this.data);
                        }
          );
          this.presentLoading();
        }
      }
    ]
  });
  confirm.present();
  }
}
}
