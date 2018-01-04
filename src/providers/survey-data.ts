import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import { CourseData } from '../providers/course-data';
import { Question } from '../providers/question';
import { API } from '../providers/api';


// This file provides tools for survey
// It selects the kind of survey ('Classique', 'Projet'...) and generates the survey
// It saves the results in the local storage and upload them asap

@Injectable()
export class SurveyData{
  course: CourseData;
  survey: Array<Question> = []  // both questions and answers

  constructor(public http: Http, private storage: Storage, private api: API, private alertCtrl:AlertController){
  }

  // save the survey in the local storage
  save(){
    for(let question of this.survey){
      console.log("saving " + this.course.id + question.id + " : " + question.answer)
      this.storage.set(this.course.id +"*"+ question.id, question.answer);
    }
  }

  // generates the survey corresponding to the course and
  // look in the local storage if we already begin it
  getSurvey(course: CourseData){
    this.course = course;
    this.survey = [];

    console.log("Trying to generate survey typeForm : " + course.typeForm);
    return new Promise((resolve, reject) => {
      let url: string;
      if(this.api.noServer){
        url = 'assets/data/typeForm/' + course.typeForm + ".json";
      }else{
        url = this.api.url + 'typeForm/' + course.typeForm + "/";
      }
      console.log("Request : " + url);
      this.http.get(url)
      .map(res => res.json())
      .subscribe(s =>
      {
            Promise.all(s.map(q => {
              return new Promise((resolve, reject) => {
                let qq: Question = new Question(q);
                this.storage.get(this.course.id + "*" +qq.id)
                .then((ans) => {
                  if(ans != null){
                    qq.answer = ans;
                    console.log(ans);
                  }
                  this.survey.push(qq);
                  resolve(qq);
                }, err => {reject(err);})
              });
            })).then(values => {resolve(this.survey);});
        }, err => {reject(err);});
      })
}
  get_survey(){
    return this.survey;
  }

  // upload the survey
  uploadSurvey(){
    if(!this.api.noServer){
      let url: string = this.api.url + "answer/" + this.course.id + "/";
      Promise.all(this.survey.map(
        question => {
          return new Promise((resolve, reject) => {
            let ans = { answer: question.answer};
            this.http.post(url + question.id + "/", ans)
            .subscribe(res => {
              resolve(question);
            }, err => {
              console.log(err);
              reject(err);
            })
          })
        }
      )).then(values => {
        this.course.answered = true;
        for(let question of this.survey){
          this.storage.remove(this.course.id +"*"+ question.id);
        }
      }).catch(err =>
      {
        console.log(err);
        let alert = this.alertCtrl.create({
          title: "Pas d'internet",
          subTitle: "Nous n'arrivons pas à envoyer vos réponses à notre serveur, veuillez réessayer plus tard. Vos réponses restent sauvegardées jusqu'à votre deconnexion.",
          buttons: ['Je le fais dès que possible']
        });
        alert.present();
      })
    }else{
      this.course.answered = true;
    }
  }
}
