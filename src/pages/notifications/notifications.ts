import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, Platform,ToastController } from 'ionic-angular';
import { PushService, Notification } from '../../services/push-service';
import { StatusBar, Splashscreen, Push, Device } from 'ionic-native';
import { NotificationPage } from '../notification/notification';
/*
  Generated class for the Notifications page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public pushService: PushService, public loading: LoadingController, public ref: ChangeDetectorRef, public events: Events) {
	
  }

  ionViewDidEnter(){
      this.events.subscribe("notification:arrived", () => this.pushService.getNotifications().then(() => this.ref.detectChanges()));
  }

  ionViewWillLeave(){
      this.events.unsubscribe("notification:arrived");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
    this.pushService.getNotifications();

  }

  delete(notification: Notification){
      this.pushService.deleteNotification(notification);
  }

  open(notification: Notification){

      let loading = this.loading.create();
      loading.present();
      this.pushService.openNotification(notification).then(() => {
          this.navCtrl.push(NotificationPage);
          loading.dismiss();
      });

  }

}
