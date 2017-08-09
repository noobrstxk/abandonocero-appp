import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Menu } from '../pages/menu/menu';
import { Actividad } from '../pages/actividad/actividad';
import { Adoptar } from '../pages/adoptar/adoptar';
import { Albergues } from '../pages/albergues/albergues';
import { Veterinarios } from '../pages/veterinarios/veterinarios';
import { Datamembers } from "../providers/datamembers";
import { PreferenciaDetallePage } from "../pages/preferencia-detalle/preferencia-detalle";
import { Parques } from '../pages/parques/parques';
import { Preferencias } from '../pages/preferencias/preferencias';
import { WellcomePage } from '../pages/wellcome/wellcome';
import { LoginPage }  from '../pages/login/login';
import { Http } from '@angular/http';
import { NotificationsPage } from '../pages/notifications/notifications';
import { NotificationPage } from '../pages/notification/notification';
import { UserService } from '../services/user-service';
import { PushService, CategorySelectedPipe, SanitizeImagePipe, pushServiceFactory } from '../services/push-service';
import { PagePerros } from '../pages/page-perros/page-perros';
import { AdoptarDetallePage } from '../pages/adoptar-detalle/adoptar-detalle';
import { AlbergueDetallePage } from '../pages/albergue-detalle/albergue-detalle';
import { ParquesDetallePage } from '../pages/parques-detalle/parques-detalle';
import { VeterinariosDetallePage } from '../pages/veterinarios-detalle/veterinarios-detalle';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar, Splashscreen, Push, Device } from 'ionic-native';
import { NativeStorage } from '@ionic-native/native-storage';


import { ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    MyApp,
    Menu,
    Actividad,
	Adoptar,
	LoginPage,
	NotificationsPage,
	NotificationPage,
	Albergues,
	Veterinarios,
	Parques,
	Preferencias,
	WellcomePage,
	CategorySelectedPipe,
	SanitizeImagePipe,
	PreferenciaDetallePage,
	PagePerros,
	AdoptarDetallePage,
	AlbergueDetallePage,
	ParquesDetallePage,
	VeterinariosDetallePage

  ],
  imports: [
	  BrowserModule,
	 BrowserModule,
    CommonModule,
    FormsModule,
	 AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBftFBciENZLMzmfL91O-knTxnGqoJ87rU'
    }),
	 IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  Menu,
	LoginPage,
	NotificationsPage,
	NotificationPage,
  Actividad,
	Adoptar,
	Albergues,
	Veterinarios,
	Parques,
	Preferencias,
	WellcomePage,
	PreferenciaDetallePage,
	PagePerros,
	AdoptarDetallePage,
	AlbergueDetallePage,
	ParquesDetallePage,
	VeterinariosDetallePage
  ],
  providers: [
  UserService,
  Push,
  Device,
  NativeStorage,
  Geolocation,
  { provide: LOCALE_ID, useValue: "es-ES" },
  { provide: PushService, useFactory: pushServiceFactory, deps: [Http] },
  { provide: ErrorHandler, useClass: IonicErrorHandler},Datamembers

  ]
})
export class AppModule {}
