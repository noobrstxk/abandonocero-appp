import { Component} from '@angular/core';
import { NavController, NavParams,LoadingController, AlertController,ViewController,Platform } from 'ionic-angular';
import { Actividad } from '../actividad/actividad';
import { Adoptar } from '../adoptar/adoptar';
import { Albergues } from '../albergues/albergues';
import { Veterinarios } from '../veterinarios/veterinarios';
import { Parques } from '../parques/parques';
import { Preferencias } from '../preferencias/preferencias';
import { WellcomePage } from '../wellcome/wellcome';
import { Config } from 'ionic-angular';



@Component({
  selector: 'Menu',
  templateUrl: 'menu.html'
})
export class Menu {
  valor:any;
  texto:any;


  public secondParam:any;
  public usuario:any;

  constructor(public navCtrl: NavController,private config: Config,public params:NavParams,public loadingCtrl:LoadingController,public alertCtrl: AlertController,public viewCtrl: ViewController,public platform: Platform) {
    this.usuario = params.get("usuario");

    if (this.usuario != undefined){
        console.log(this.usuario);
        this.valor = "CERRAR SESIÓN";
    }else {
        this.valor = "Salir";
    }


  }

  ionViewDidLoad() {
    this.viewCtrl.showBackButton(false);
}


CerrarSesion()
{
  console.log("aki");
  if (this.usuario != undefined){
  this.presentLoadingDefault2();
  this.navCtrl.push(WellcomePage);
}else {
  this.navCtrl.push(WellcomePage);
}

}



  openPageAdopta(page) {
    this.navCtrl.push(Adoptar,{usuario: this.usuario});
	this.presentLoadingDefault();
  }
  openPageActividad(page) {
    if (this.usuario !=undefined){
      this.navCtrl.push(Actividad);
      this.presentLoadingDefault();
    } else {
       let confirm = this.alertCtrl.create({
       title: '¡Regístrese Ahora!',
       message: '¡Debe registrarse para usar esta opción!',
     });
     confirm.present();
   }
  }
  openPageAlbergues(page) {
    this.navCtrl.push(Albergues);
	this.presentLoadingDefault();
  }
  openPageVeterinarios(page) {
    this.navCtrl.push(Veterinarios);
	this.presentLoadingDefault();
  }
  openPageParques(page) {
    this.navCtrl.push(Parques);
	this.presentLoadingDefault();
  }

  openPagePreferencias(page) {
    if (this.usuario !=undefined){
      this.navCtrl.push(Preferencias,{usuario: this.usuario});
    } else {
       let confirm = this.alertCtrl.create({
       title: '¡Regístrese Ahora!',
       message: '¡Debe registrarse para usar esta opción!',
     });
     confirm.present();
   }
  }

   public presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Cargando Recursos...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 3000);
}

public presentLoadingDefault2() {
let loading = this.loadingCtrl.create({
 content: 'Cerrando Sesión...'
});

loading.present();

setTimeout(() => {
 loading.dismiss();
}, 2000);
}

}
