import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController  } from 'ionic-angular';
import {Datamembers} from "../../providers/datamembers";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Menu } from '../menu/menu';

/*
  Generated class for the PagePerros page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-page-perros',
  templateUrl: 'page-perros.html'
})
export class PagePerros {
	public firstParam:any;
  public distancia:any;
	confirmar: any;
	id: any;
	ida: any;
	idperro: any;
  perroList: any;
  loadedperroList: any;
  perro : any;
  public show:number;
  perros: Array<any>;
  edad:any;
  usuario:any;

  constructor(public navCtrl: NavController,public loadingCtrl:LoadingController, public params: NavParams,public data:Datamembers,public http: Http,public alertCtrl: AlertController) {
	 this.firstParam = params.get("firstPassed");
   this.distancia = params.get("distancia");
   this.edad = params.get("edad");
   this.usuario = params.get("usuario");

   console.log(this.distancia);
   console.log(this.edad);

	 this.id = this.firstParam;
	 console.log(this.id);
	 this.confirmar = "false";
			 var url = 'http://entornodepre.com/abandonocero/web/Inventia/Razas/';
			    this.http.get(url).map(res => res.json()).subscribe(
			         data => {
				             this.perros = data;
				             console.log(this.perros);
				             this.perroList = this.perros;
				             this.loadedperroList = this.perros;
		           });
  }

public presentLoadingDefault() {
 let loading = this.loadingCtrl.create({
   content: 'Añadiendo animal a tus razas...'
 });

 loading.present();

 setTimeout(() => {
   loading.dismiss();
 }, 3000);
}




  initializeItems(){
    this.perroList = this.loadedperroList;

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

    this.perroList = this.perroList.filter((v) => {
      if(v.nombre && q) {
        if (v.nombre.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.perroList.length);

  }


  showConfirm(index, perro) {
      let confirm = this.alertCtrl.create({
      title: 'SELECIONAR RAZA PREFERIDA',
      message: 'Te gustaría agregar esta raza de animal a tus preferencias?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
			         this.confirmar = 'false';
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
		      this.ida = perro.nombre;
		      this.data.InsertarPreferenciaAnimal(this.id,this.ida,this.edad,this.distancia).subscribe(
            data => {
            console.log(data);
            },
		        );
            this.presentLoadingDefault();
          this.navCtrl.push(Menu,{usuario: this.usuario});
          }
        }
      ]
    });
    confirm.present();
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad PagePerros');
  }


}
