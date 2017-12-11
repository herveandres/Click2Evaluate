import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StudentsData } from "../../providers/students-data";
import { SurveyData } from "../../providers/survey-data";
import { CourseData } from "../../providers/course-data";

import { SurveyPage } from "../survey/survey";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController, public studentsData: StudentsData, public surveyData:SurveyData){
    if(this.studentsData.connected){
      this.studentsData.getCourses();
    }

  }


  ionViewWillLeave(){
    this.studentsData.saveCourses();
    console.log("Bye bye");
  }

  openSurvey(course: CourseData){
      this.surveyData.getSurvey(course).then(res => {this.navCtrl.push(SurveyPage);});
  }
  refresh_data(){
    this.studentsData.getCoursesOnline();
  }
  disconnect(){
    this.studentsData.disconnect();
    this.navCtrl.setRoot(LoginPage);
  }

}
