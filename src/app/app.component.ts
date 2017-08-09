import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Menu } from '../pages/menu/menu';
import { WellcomePage } from '../pages/wellcome/wellcome';
import { Actividad } from '../pages/actividad/actividad';
import { Adoptar } from '../pages/adoptar/adoptar';
import { Albergues } from '../pages/albergues/albergues';
import { Veterinarios } from '../pages/veterinarios/veterinarios';
import { Parques } from '../pages/parques/parques';
import { Preferencias } from '../pages/preferencias/preferencias';
import { PreferenciaDetallePage } from '../pages/preferencia-detalle/preferencia-detalle';
import { Events, ToastController } from 'ionic-angular';
import { StatusBar, Splashscreen, Push, Device } from 'ionic-native';
import { PushService } from '../services/push-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WellcomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, pushService: PushService, events: Events, toastCtrl: ToastController) {
    Splashscreen.show();

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
        });

        push.on('error', (e) => {
          console.log(e.message);
        });



        push.on('notification', (data) => {
            console.log(data.message);
            console.log(data.title);
            console.log(data.count);
            console.log(data.sound);
            console.log(data.image);
            console.log(data.additionalData);
            let toast = toastCtrl.create({
              message: data.message,
              showCloseButton: true,
              dismissOnPageChange: true
            });
            toast.present();
            events.publish("notification:arrived", data.message);
        });
      }


      StatusBar.styleDefault();

      console.log('splash hide');
    });


	this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Menu', component: Menu },
      { title: 'Adoptar', component: Adoptar },
	  { title: 'Actividad', component: Actividad },
	  { title: 'Albergues', component: Albergues },
      { title: 'Veterinarios', component: Veterinarios },
	  { title: 'Parques', component: Parques },
      { title: 'Preferencias', component: Preferencias },
	  { title: 'PreferenciasDetallePage', component: PreferenciaDetallePage }

    ];

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
