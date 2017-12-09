import { Component } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { SurveyData } from '../../providers/survey-data';
import { Question } from '../../providers/question';

@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html'
})
export class SurveyPage {
  label_current_question: string;


  constructor(public navCtrl: NavController, public surveyData:SurveyData) {

  }
  display(){
    console.log(this.surveyData.survey);
  }

  displayable(question:Question){
    if(!question.isSub){
      return true;
    }else{
      let answer: any = this.surveyData.survey[question.parentsQuestionId].answer;
      if(typeof answer === "number"){
        return answer == question.parentsQuestionValue;
      }else{
        for(let ans of answer){
          if(ans == question.parentsQuestionValue){
            return true;
          }
        }
        return false;
      }
    }
  }
}
