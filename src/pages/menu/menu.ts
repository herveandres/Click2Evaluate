import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { StudentsData } from "../../providers/students-data";
import { SurveyData } from "../../providers/survey-data";
import { CourseData } from "../../providers/course-data";

import { SurveyPage } from "../survey/survey";
import { LoginPage } from "../login/login";
import { CoursesModalPage } from "../coursesModal/coursesModal";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController, public studentsData: StudentsData,
    public surveyData:SurveyData, public modalCtrl: ModalController,
    private alertCtrl: AlertController){
    if(this.studentsData.connected){
      this.studentsData.getCourses();
    }
  }

  ionViewWillLeave(){
    this.studentsData.saveCourses();
    console.log("Bye bye");
  }

  available(course: CourseData){
      return !this.tooLate(course) && !this.tooSoon(course);
  }

  tooLate(course: CourseData){
      return new Date().getTime() - new Date(course.commissionsDate).getTime() > 0;
  }

  tooSoon(course: CourseData){
    return new Date().getTime() - new Date(course.availableDate).getTime() < 0;
  }

  openSurvey(course: CourseData){
      this.surveyData.getSurvey(course).then(res => {this.navCtrl.push(SurveyPage);}, err => {
        let alert = this.alertCtrl.create({
          title: "Pas d'internet",
          subTitle: "Nous n'arrivons pas à accéder à notre serveur pour télécharger le questionnaire. veuillez réessayer ultérieurement.",
          buttons: ['Ok']
        });
      alert.present();
      });
  }

  refresh_data(){
    this.studentsData.getCoursesOnline();
  }

  openModal(course){
      let myModal = this.modalCtrl.create(CoursesModalPage, {
        label: course.label,
        id: course.id,
        answered: course.answered,
        group: course.group,
        delegate: course.delegate,
        commissionsDate: course.commissionsDate,
        availableDate: course.availableDate,
        typeForm: course.typeForm,
        available: this.available(course),
      });
      myModal.present();
  }

  disconnect(){
    this.studentsData.disconnect();
    this.navCtrl.setRoot(LoginPage);
  }

}
