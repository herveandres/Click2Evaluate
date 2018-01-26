import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { CourseData } from "../../providers/course-data";
import { SurveyData } from "../../providers/survey-data";

import { SurveyPage } from "../survey/survey";

@Component({
  selector: 'page-coursesModal',
  templateUrl: 'coursesModal.html'
})
export class CoursesModalPage {
  course: CourseData = this.navParams.get('courseToDisplay');
  label: string = this.course.label;
  id: number = this.course.id;
  answered: string = (this.course.answered)?"Oui":"Non";
  group: number = this.course.group;
  delegate: string = this.course.delegate;
  commissionsDate: string = new Date(this.course.commissionsDate).toLocaleString();
  availableDate: string = new Date(this.course.availableDate).toLocaleString();
  typeForm: string = this.course.typeForm;
  available: boolean = this.navParams.get("available");
  surveyData: SurveyData = this.navParams.get("surveyData");

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public navCtrl: NavController,private alertCtrl: AlertController) {
    console.log("Open modal for course : " + this.id);

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
  openSurvey(){
    console.log(this.surveyData);
    this.surveyData.getSurvey(this.course).then(res => {this.navCtrl.push(SurveyPage);}, err => {
      let alert = this.alertCtrl.create({
        title: "Pas d'internet",
        subTitle: "Nous n'arrivons pas à accéder à notre serveur pour télécharger le questionnaire. veuillez réessayer ultérieurement.",
        buttons: ['Ok']
      });
    alert.present();
    });
  }
}
