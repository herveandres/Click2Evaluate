import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";

import { Click2Evaluate } from './app.component';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { SurveyPage } from './../pages/survey/survey';

import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    Click2Evaluate,
    LoginPage,
    MenuPage,
    SurveyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Click2Evaluate),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Click2Evaluate,
    LoginPage,
    MenuPage,
    SurveyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
