import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams, ViewController } from 'ionic-angular';

import { CourseData } from "../../providers/course-data";
import { SurveyData } from "../../providers/survey-data";

import { MenuPage } from "../menu/menu";

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
  menu: MenuPage = this.navParams.get("this");

    constructor(public navParams: NavParams, public viewCtrl: ViewController,
      public navCtrl: NavController){
      console.log("Open modal for course : " + this.id);

    }

    closeModal() {
      this.viewCtrl.dismiss();
    }

    openSurvey(){
      this.closeModal();
      this.menu.openSurvey(this.course);
    }
}
