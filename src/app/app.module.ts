import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";
import { LocalNotifications } from "@ionic-native/local-notifications";

import { Click2Evaluate } from './app.component';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { SurveyPage } from './../pages/survey/survey';
import { CoursesModalPage } from '../pages/coursesModal/coursesModal';

import { Autosize } from '../directives/autosize/autosize';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    Click2Evaluate,
    LoginPage,
    MenuPage,
    SurveyPage,
    CoursesModalPage,
    Autosize
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Click2Evaluate),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Click2Evaluate,
    LoginPage,
    MenuPage,
    SurveyPage,
    CoursesModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
