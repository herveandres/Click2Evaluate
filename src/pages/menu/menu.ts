import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
    private alertCtrl: AlertController, private localNotif: LocalNotifications){
    if(this.studentsData.connected){
      this.studentsData.getCourses();
    }
    this.localNotif.on('click', () => {
      console.log("Notification clicked !");
      this.navCtrl.setRoot(MenuPage);
    });
    //this.studentsData.scheduleNotif();
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
  display_help(){
    let alert = this.alertCtrl.create({
      title: 'Aide',
      message: 'Faites glisser un cours vers la gauche pour l\'évaluer. \n Cliquez sur un cours pour obtenir toutes les informations relatives à ce cours.',
      buttons: ['Ok']
    });
    alert.present();
  }
  display_credits(){
    let alert = this.alertCtrl.create({
      title: 'Crédits',
      message: 'Cette application a été réalisée par Hervé ANDRES, Marc-Antoine AUGÉ,Bastien DÉCHAMPS et Michaël KARPE en collaboration avec Barbara GERARD pour l\'aspect pratique et Xavier CLERC pour l\'aspect technique',
      buttons: ['Ok']
    });
    alert.present();
  }
  openModal(course){
      let myModal = this.modalCtrl.create(CoursesModalPage, {
        courseToDisplay: course,
        available: this.available(course),
        surveyData:this.surveyData
      });
      myModal.present();
  }

  disconnect(){
    this.studentsData.disconnect();
    this.navCtrl.setRoot(LoginPage);
  }

  scheduleNotif(){
    this.studentsData.scheduleNotif();
  }

}
