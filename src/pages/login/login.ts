import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController, AlertController,Platform,ViewController } from 'ionic-angular';
import {Datamembers} from "../../providers/datamembers";
import { Menu } from "../menu/menu";
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { WellcomePage } from "../wellcome/wellcome";
import { StatusBar, Splashscreen, Push, Device } from 'ionic-native';
import { PushService} from '../../services/push-service';
import { NativeStorage } from '@ionic-native/native-storage';
import { Config } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    myForm: FormGroup;
	  members: Array<any>;
    loader: any;
	  public usuario:any;
    validar:any;
    coordLat:any;
  	coordLon:any;
    ok: any;
  	tokenx: any;
    person;
    correo:any;

    constructor(public navCtrl: NavController,private nativeStorage: NativeStorage,public platform: Platform,private config: Config, public pushService: PushService,private geolocation: Geolocation,public navParams: NavParams,private  push: Push,private  device: Device,public fb: FormBuilder,public data:Datamembers,public alertCtrl:AlertController,public loadingCtrl:LoadingController,public viewCtrl: ViewController) {
      this.validar = navParams.get("validar");
      this.config.set('backButtonText','Atrás');



      this.myForm = this.fb.group({
          'email': ['', [Validators.required,Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
          'edad': ['', [Validators.required]],
          'password': ['', [Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
      	});

        platform.ready().then(() => {
    console.log("Estoy preparado");
    let push = Push.init({
        android: {
         senderID: '996483111783'
       },
       ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
       },
       windows: {}
     });

     if (typeof push.on == 'function'){
         push.on('registration', (data) => {
         pushService.init(data.registrationId, Device.uuid, platform.is('android') ? 'android' : 'ios', true);
         this.tokenx = data.registrationId;
     });

   push.on('registration', function(data) {
       console.log("registration event");
       console.log(data.registrationId);
   });
     }


     StatusBar.styleDefault();
     Splashscreen.hide();
     console.log('splash hide');
   });
    }

  ionViewWillEnter() {
    this.nativeStorage.getItem('datos')
    .then(
      data =>this.correo = data.email,
      error => console.error(error)
    );
    
    }

  showAlert(){
  let alert = this.alertCtrl.create({
  title: '¡Aviso!',
  subTitle: 'Error, Introduce un correo o una contraseña valida',
  buttons: ['Aceptar']
  });
  alert.present();
  }


 public presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Cargando...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 2000);
}


   public Iniciar(passx: string, emailx: string)
  {
	  this.presentLoadingDefault();
      this.data.Iniciar(passx,emailx).subscribe(
        data => {
        this.usuario = data;
			   var secreto = JSON.stringify(data).replace(/"/g , "");

           if(secreto ==null || secreto =="Incorrecto")
            {
                          this.showAlert();

            } else{
                       this.navCtrl.push(Menu,{firstPassed: secreto,usuario: this.usuario});

                       this.nativeStorage.setItem('datos', {email: emailx})
                         .then(
                           () => console.log('Stored item!'),
                           error => console.error('Error storing item', error)
                         );

            }
        },

    );

  }


  recover() {
  let alert = this.alertCtrl.create({
    title: 'Recuperar contraseña',
    inputs: [
      {
        name: 'correoelectronico',
        placeholder: 'correo electronico'
      }

    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Aceptar',
        handler: data => {
          this.presentLoadingDefault();
           this.data.Recover(data.correoelectronico).subscribe(
                data => {
                    console.log (data);
                  },
            );
        }

      }
    ]
  });
  alert.present();
}

saveData(){
  	console.log(this.myForm.value);
  }

public Insert(email: string,pass: string,edad: string)
{
    this.presentLoading();

    this.geolocation.getCurrentPosition().then((resp) =>
    {

    this.data.InsertMember(email,pass,edad,this.tokenx,resp.coords.latitude,resp.coords.longitude).subscribe(
      data => {
        console.log(data);
        this.ok = data;
        if (this.ok == "gut" ){
          this.navCtrl.push(WellcomePage);
        } else {
          let confirm = this.alertCtrl.create({
          title: 'Fallo al registrarse!',
          message: '¡Ya existe un correo llamado así en uso!',
        });
        confirm.present();
        }
       console.log(this.tokenx);
        this.loader.dismiss();
      },

  );

}).catch((error) => {
  console.log('Error getting location', error);
});

}
presentLoading() {
      this.loader = this.loadingCtrl.create({
          content: "Creando cuenta...."
      });
      this.loader.present();

  }

  }
