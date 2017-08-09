import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PushService, Notification } from '../../services/push-service';
/*
  Generated class for the Notification page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public pushService: PushService) {}

  notification: Notification;

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    this.notification = this.pushService.current_notification;
    this.pushService.readNotification(this.notification);
  }
    delete(notification: Notification){
      this.pushService.deleteNotification(notification);
  }

}
