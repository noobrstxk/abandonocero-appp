import { Component } from '@angular/core';
import { NavController, NavParams,ViewController} from 'ionic-angular';
import { Menu } from "../menu/menu";
import {LoginPage} from '../login/login';
import { Config } from 'ionic-angular';

@Component({
  selector: 'page-wellcome',
  templateUrl: 'wellcome.html'

})
export class WellcomePage {
	members: Array<any>;
    loader: any;
    person;
  constructor(  public navCtrl: NavController,public navParams: NavParams,private config: Config,public viewCtrl: ViewController)
  {

  }

	goToLogin() {
    	this.navCtrl.push(LoginPage);
  	}

	goToMenu() {
    	this.navCtrl.push(Menu);
  	}

    ionViewDidLoad() {
      this.viewCtrl.showBackButton(false);
    }

}
