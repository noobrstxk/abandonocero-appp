import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {Datamembers} from "../../providers/datamembers";
import { PreferenciaDetallePage } from '../preferencia-detalle/preferencia-detalle';
import {Http} from '@angular/http';
import { LoginPage } from "../login/login";


@Component({
  selector: 'page-preferencias',
  templateUrl: 'preferencias.html'
})
export class Preferencias {

	  groceries: any;
	  id: any;
	  members: Array<any>;
	  notes: any = [];
    distancias:any[] = [
      {name:'10'},
      {name:'100'},
      {name:'1000'},
    ];
    categories:any[] = [
      {name:'cachorro'},
      {name:'mediano'},
      {name:'mayor'},
    ];

    Pdistancia:any;
    Userdistancia:any;
    public usuariox:any;
    edad: any;
    validar:any;

    onChange2(newValue) {
      if (this.members.length == 0){
        let confirm = this.alertCtrl.create({
        title: '¡Selecione une Raza de animal!',
        message: '¡Debe selecionar primero una raza como minimo!',
      });
      confirm.present();
    }else {
      this.edad = newValue;
    }
  }

    onChange(newValue) {
      if (this.members.length == 0){
        let confirm = this.alertCtrl.create({
        title: '¡Selecione une Raza de animal!',
        message: '¡Debe selecionar primero una raza como minimo!',
      });
      confirm.present();
    }else {
    this.Pdistancia = newValue;
  }
 }

  constructor(public navCtrl: NavController, public params: NavParams, public data:Datamembers,public alertCtrl: AlertController,public http: Http,public loadingCtrl:LoadingController) {
    this.usuariox = params.get("usuario");

    if (this.Userdistancia == undefined){
      this.Userdistancia = "sin definir aún por usuario";
    }
    if (this.edad == undefined){
    this.edad = "sin definir aún por usuario";
  }
  }

  public presentLoading() {
   let loading = this.loadingCtrl.create({
     content: 'Obteniendo información!...'
   });
   loading.present();
   setTimeout(() => {
     loading.dismiss();
   }, 3000);
 }

  ionViewDidLoad() {
    this.presentLoading();
    this.edad ="cachorro";
    this.Pdistancia ="100";
    this.id = this.usuariox.id;
    this.data.ShowPreferencias(this.id).subscribe(
           data => {
                this.members = data;
                if (data != ""){
                this.Userdistancia = this.members[0].Pdistancia;
                this.edad = this.members[0].Edad;
                this.Pdistancia = this.Userdistancia;
                console.log(this.Userdistancia);
                  }
          },
    );
  }

  public presentLoadingDefault() {
   let loading = this.loadingCtrl.create({
     content: 'Validando datos!...'
   });
   loading.present();
   setTimeout(() => {
     loading.dismiss();
   }, 3000);
 }


 updatePreferencias(pass: string, email: string) {
  let confirm = this.alertCtrl.create({
  title: '¿Desea actualizar sus datos?',
  message: 'sus datos están apunto de modificarse',
  buttons: [
    {
      text: 'Cancelar',
      handler: () => {
      }
    },
    {
      text: 'Aceptar',
      handler: () => {

        this.presentLoadingDefault();
        this.data.UpdateUser(this.id,email,pass).subscribe(
          data => {
          console.log(data);
          },
        );
          this.data.UpdatePreferenciaAnimal(this.id,this.Pdistancia,this.edad).subscribe(
            data => {
              console.log(data);
            },
          );

      }
    }
  ]
});
confirm.present();
}



addNote(){
			this.navCtrl.push(PreferenciaDetallePage,{firstPassed: this.id,distancia: this.Userdistancia,edad: this.edad,usuario: this.usuariox});
    }

}
