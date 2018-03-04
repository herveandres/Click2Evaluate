import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { StudentsData } from '../providers/students-data';
import { SurveyData } from '../providers/survey-data';
import { API } from '../providers/api';

@Component({
  templateUrl: 'app.html',
  providers: [StudentsData, SurveyData,API]
})

export class Click2Evaluate {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public studentsData: StudentsData) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
