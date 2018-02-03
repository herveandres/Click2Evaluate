import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SurveyData } from '../../providers/survey-data';
import { StudentsData } from "../../providers/students-data";
import { Question } from '../../providers/question';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { MenuPage } from '../menu/menu';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html'
})
export class SurveyPage {
  base_questions:Array<Question> = [];
  additional_questions: {[id:number]:Array<Question>;}={};
  label_current_question: string;
  lock_swipe: boolean;
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
              public surveyData:SurveyData,
              private alertCtrl: AlertController,
              public studentsData: StudentsData,
              private localNotif: LocalNotifications) {
    for(let question of this.surveyData.survey){
      console.log("Boucle");
      if(this.displayable(question)){
          this.base_questions.push(question);
          this.additional_questions[question.id] = [];
      }
    }
    this.lock_swipe = false;
    console.log(this.additional_questions[1]);
    console.log(this.base_questions);
  }
  display(){
  //this.save_answers();
  }

  ionViewWillLeave(){
    this.surveyData.save();
    console.log("Quit survey");
  }

  check_possible(){
    if(this.slides.getPreviousIndex() > 0 && this.slides.getActiveIndex() != this.slides.length()){
      if(this.base_questions[this.slides.getActiveIndex()-2].obligatory){
          if(typeof this.base_questions[this.slides.getActiveIndex()-2].answer != "number"
          && this.base_questions[this.slides.getActiveIndex()-2].answer == ""){
              this.missingAnswer();
          }
      }
    }
  }
  swipe_unlock(){
      this.slides.lockSwipes(false);
  }
  missingAnswer() {
    let alert = this.alertCtrl.create({
      title: 'La question est obligatoire',
      subTitle: 'Merci d\'y répondre afin de pouvoir poursuivre le questionnaire',
      buttons:
      [
        {
          text : 'Ok',
          handler:()=>{
            this.slides.slidePrev();
            this.slides.lockSwipes(true);
            this.lock_swipe = true;}
        }
      ]
    });
   alert.present();
  }

  send_survey(){
    this.surveyData.uploadSurvey();
    this.rescheduleReminfNotif();
    this.navCtrl.setRoot(MenuPage);
  }

  rescheduleReminfNotif(){
    let nbCourses: number = this.studentsData.CoursesToEvaluate();
    if (nbCourses > 0){
      console.log("Nb of courses remaining : ", nbCourses);
    } else {
      console.log("There are not courses to evaluate anymore, cancelling remind notifications...");
      this.localNotif.cancel(1);
    }
  }

  insert_question(question:Question,index:number,parent_id:number){
      if(this.base_questions.every((q:Question,i:number,tab:Question[])=>{return q.id != question.id;})){
        console.log("Insertion");
        this.additional_questions[parent_id].push(question);
        this.base_questions.splice(index,0,question);
        console.log(this.base_questions);
        console.log(this.additional_questions[parent_id]);
      }
  }
  delete_question(parent_position:number,relative_position:number, parent_id:number){
    this.base_questions.splice(parent_position+relative_position+1,1);
    this.additional_questions[parent_id].splice(relative_position,1);
    console.log("Suppression");
    console.log(this.base_questions);
    console.log(this.additional_questions[parent_id]);
  }

  displayable(question:Question){
    if(!question.isSub){
      return true;
    }else{
      let answer: any = this.surveyData.survey[question.parentsQuestionPosition].answer;
      let parent_position : number;
      for(let i = 0; i < this.base_questions.length; i++){
        if(this.base_questions[i].position == question.parentsQuestionPosition){
            parent_position = i;
            break;
        }
      }
      let parent_id : number = this.base_questions[parent_position].id;
      if(typeof answer == "number"){
          if(answer == question.parentsQuestionValue){
            this.insert_question(question,parent_position+this.additional_questions[parent_id].length+1,parent_id);
            return true;
          }else{
            for(let id in this.additional_questions){
                if(this.surveyData.survey[question.parentsQuestionPosition].id == parseInt(id)
                     && this.additional_questions[parseInt(id)].indexOf(question)>-1){
                    this.delete_question(parent_position,this.additional_questions[parseInt(id)].indexOf(question),parent_id);
                }
            }
            return false;
          }
      }else{
          // select many
        if(answer[question.parentsQuestionValue]){
          this.insert_question(question,parent_position + this.additional_questions[parent_id].length +1,parent_id);
          return true;

        }

        for(let id in this.additional_questions){
          if(this.surveyData.survey[question.parentsQuestionPosition].id == parseInt(id)
               && this.additional_questions[parseInt(id)].indexOf(question)>-1){
              this.delete_question(parent_position,this.additional_questions[parseInt(id)].indexOf(question),parent_id);
          }
        }
        return false;
      }
    }
  }
}
