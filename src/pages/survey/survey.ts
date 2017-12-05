import { Component } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { SurveyData } from '../../providers/survey-data';

@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html'
})
export class SurveyPage {
  label_current_question: string;


  constructor(public navCtrl: NavController, public surveyData:SurveyData) {

  }

}
