import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { CourseData } from '../providers/course-data';
import { Question } from '../providers/question';


// This file provides tools for survey
// It selects the kind of survey ('Classique', 'Projet'...) and generates the survey
// It saves the results in the local storage and upload them asap

@Injectable()
export class SurveyData{
  course: CourseData;
  survey: Array<Question> = []  // both questions and answers

  constructor(public http: Http, private storage: Storage){
  }

  // save the survey in the local storage
  save(){
    for(let question of this.survey){
      console.log("saving " + this.course.id + question.id + " : " + question.answer)
      this.storage.set(this.course.id + question.id, question.answer);
    }
  }

  // generates the survey corresponding to the course and
  // look in the local storage if we already begin it
  getSurvey(course:CourseData){
    this.course = course;
    this.survey = [];

    console.log("Trying to generate survey for course : " + course.id + " typeForm : " + course.typeForm);
    return new Promise(resolve => {
      this.http.get('assets/data/typeForm/'+ course.typeForm +'.json')
      .map(res => res.json())
      .subscribe(s =>
        {
            Promise.all(s.map(q => {
              return new Promise(resolve => {
                let qq: Question = new Question(q);
                this.storage.get(this.course.id + qq.id)
                .then((ans) => {
                  if(ans != null){
                    qq.answer = ans;
                    console.log(ans);
                  }
                  this.survey.push(qq);
                  resolve(qq);
                })
              });
            })).then(values => {resolve(this.survey);});
        });
      })
}
  get_survey(){
    return this.survey;
  }

  // upload the survey
  uploadSurvey(){

  }


}
