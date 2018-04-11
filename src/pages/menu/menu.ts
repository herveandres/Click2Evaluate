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
      this.surveyData.getSurvey(course, this.studentsData.token).then(res => {this.navCtrl.push(SurveyPage);}, err => {
        let alert = this.alertCtrl.create({
          title: "Pas d'internet",
          subTitle: "Nous n'arrivons pas à accéder à notre serveur pour télécharger le questionnaire. veuillez réessayer ultérieurement.",
          buttons: ['Ok']
        });
      alert.present();
      });
  }

  // download courses from server. Unused
  refresh_data(){
    this.studentsData.getCourses();
  }
  display_help(){
    let alert = this.alertCtrl.create({
      title: 'Aide',
      message: '<ul>\
      <li> Faites glisser un cours vers la gauche pour l\'évaluer</li>\
      <li> liquez sur un cours pour obtenir toutes les informations relatives à ce cours.</li>\
      <li> Un icône Warning est placé à côté des cours dont vous êtes responsables</li></ul>',
      buttons: ['Ok']
    });
    alert.present();
  }
  display_credits(){
    let alert = this.alertCtrl.create({
      title: 'Crédits',
      message: 'Cette application a été réalisée par Hervé Andres, Marc-Antoine Augé,\
      Bastien Déchamps et Michaël Karpe en collaboration avec Barbara Gérard pour\
      l\'aspect pratique et Xavier Clerc pour l\'aspect technique pendant l\'année scolaire\
      2017/2018.<br/>\
      L\'application s\'accompagne d\'un outil d\'administration complet dont les sources sont\
      disponibles sur Github <a href="https://github.com/HerrVey/Click2Evaluate">ici</a> et \
      <a href="https://github.com/Marc-AntoineA/Click2Evaluate_server">ici</a>',
      buttons: ['Ok']
    });
    alert.present();
  }
  openModal(course){
      let myModal = this.modalCtrl.create(CoursesModalPage, {
        courseToDisplay: course,
        available: this.available(course),
        surveyData: this.surveyData,
        this: this,
      });
      myModal.present();
  }

  disconnect(){
    this.studentsData.disconnect();
    this.navCtrl.setRoot(LoginPage);
  }

}
