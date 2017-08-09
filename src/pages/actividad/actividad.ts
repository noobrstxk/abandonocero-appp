import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Events, NavParams, AlertController } from 'ionic-angular';
import { PushService, Notification } from '../../services/push-service';
import { NotificationsPage } from '../notifications/notifications';
import { UserService, Account } from '../../services/user-service';
import { ExternalPage } from '../external/external';

/*
  Generated class for the Actividad page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-actividad',
  templateUrl: 'actividad.html'
})
export class Actividad {
	
  unreadNotifications: number = 0;
  notificationsPage = NotificationsPage;
  account: Account;

  constructor(public navCtrl: NavController, public pushService: PushService, private ref: ChangeDetectorRef, public events: Events, public userService: UserService, public alertCtrl: AlertController) {}

  ionViewWillLeave(){
      this.events.unsubscribe("notification:arrived");
  }

  ionViewDidEnter(){
    this.events.subscribe("notification:arrived", () => this.updateNotificationCount().then(() => this.ref.detectChanges()));
    this.pushService.initialized$.subscribe(initialized => this.updateNotificationCount().then(() => this.ref.detectChanges()));
    this.account = this.userService.fetch();
  }

  updateNotificationCount(){
    return this.pushService.getNotificationsCount().then(unreadNotifications => this.unreadNotifications = unreadNotifications);
  }

  gotoExternal(){
    let alert = this.alertCtrl.create({
      title: 'Introduzca el código de verificación',
      message: `<img src="http://www3.gobiernodecanarias.org/educacion/9/PEKWEB/Ekade/Movil/Home/GetCaptcha">`,
      inputs: [
        {name: 'code', placeholder: 'Código de verificación'}
      ],
      buttons: [
        {text: 'Cancelar', role: 'cancel'},
        {text: 'Aceptar', handler: data => this.userService.connect(data.code).then(() => this.navCtrl.push(ExternalPage)) }
      ]
    });
    alert.present();
    //http://www3.gobiernodecanarias.org/educacion/9/PEKWEB/Ekade/Movil/Home/GetCaptcha
    //this.userService.connect().then(() => this.navCtrl.push(ExternalPage));
  }

}
