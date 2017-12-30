import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SurveyData } from '../../providers/survey-data';
import { Question } from '../../providers/question';

import { MenuPage } from '../menu/menu';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html'
})
export class SurveyPage {
  mandatory_questions:Array<Question> = [];
  label_current_question: string;
  @ViewChild(Slides) slides: Slides;
  
  constructor(public navCtrl: NavController, public surveyData:SurveyData,private alertCtrl: AlertController) {
    console.log("Génération");
    console.log(surveyData.survey);
    console.log("Length " + surveyData.survey.length);
    for(let question of surveyData.survey){
      console.log("Boucle");
      if(this.displayable(question)){
          this.mandatory_questions.push(question);
      }
    }
    console.log(this.mandatory_questions);
  }
  display(){
  //this.save_answers();
  }

  ionViewWillLeave(){
    this.surveyData.save();
    console.log("bye");
  }
  check_possible(){
    if(this.mandatory_questions[this.slides.getActiveIndex()].obligatory){
        if(this.mandatory_questions[this.slides.getActiveIndex()].answer == ""){
            this.slides.lockSwipeToNext(true);
            this.missingAnswer();

        }
        else{
          this.slides.lockSwipeToNext(false);
        }
    }
  }
  missingAnswer() {
    let alert = this.alertCtrl.create({
      title: 'La question est obligatoire',
      subTitle: 'Merci d\' y répondre afin de pouvoir poursuivre le questionnaire',
      buttons: ['Ok']
    });
    alert.present();
  }
  send_survey(){
    this.surveyData.course.answered = true;
    console.log(this.surveyData.course);
    this.navCtrl.setRoot(MenuPage);
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
