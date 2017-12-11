import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { CourseData } from '../providers/course-data';
import { SurveyData } from '../providers/survey-data';

// Connect somebody (verify if ldap and password corresponding)
// and download the list of his courses
// If stayConnected save the data in the local storage (TODO)
// Now it works with .json files in assets/data/

@Injectable()
export class StudentsData{
  ldap: string = ""; // id like vorname.name@enpc.fr
  connected: boolean = false;
  courses: Array<CourseData> = []; // list of courses


  constructor(public http: Http, public surveyData:SurveyData, private storage: Storage){
  }

  isAlreadyConnected(){
      return new Promise(resolve => {
          this.storage.get("ldap").then(res => {
            this.ldap = res;
            if(this.ldap != null){
              this.connected = true;
            }
            resolve (this.ldap != null);
      })});
  }

  connect(ldap: string, password: string, stayConnected: boolean){
    this.courses = [];
    console.log("Trying to connect : " + ldap);
    this.ldap = ldap;

    if(stayConnected){
      this.storage.set("ldap", ldap);
    }else{
      this.storage.set("ldap", "");
    }
    return new Promise(resolve => {
      this.http.get('assets/data/data_students.json')
      .map(res => res.json())
      .subscribe(data => {
        this.connected = (data.filter(h => h.LOGIN_LDAP == this.ldap).length > 0);
        console.log("Connected ? " + this.connected);
        resolve(this.connected);
      })
    })
  }

  getCourses(){
    console.log("Trying to get courses for : " + this.ldap);
    if(this.connected){
      // get courses in local storage
      let listCourses: Array<string> = [];
      this.storage.get("listCourses").then(res => {
        if(res != null){
          listCourses = res.split(";");
        }});
      if(listCourses.length > 0){
        listCourses.map(name => {
          this.storage.get(name + "_data").then((res) => {
              let data: any;
              data = res;
              this.courses.push(new CourseData(data, data.group, data.answered));
              console.log("Got course " + name + " from local storage");
              console.log(new CourseData(data, data.group, data.answered));
            });
        });
        return Promise.resolve(this.courses);
      }

      if(this.courses.length > 0){
        return Promise.resolve(this.courses);
      }else{
        return new Promise(resolve => {
          this.http.get('assets/data/data_students.json')
          .map(res => res.json())
          .subscribe(courses => {
            let raw:any = courses.filter(h => h.LOGIN_LDAP == this.ldap);
            console.log(raw);
            raw.map(x => {
              this.addCourse(x.CODE_MODULE, x.SC_GROUPE, false);
              });
            resolve(this.courses);
          })
        })
      }
    }else{
      console.log("Nobody is connected.");
    }
  }

  addCourse(code_module: string, group: number, answered: boolean){
    console.log("Trying to add course with id : " + code_module);
    return new Promise(resolve => {
      this.http.get('assets/data/data_courses.json')
      .map(res => res.json())
      .subscribe(data => {
        this.courses.push(new CourseData(data.filter(h => h.Id == code_module)[0], group, answered));
        if(data.filter(h => h.Id == code_module)[0]){
          console.log("Course : " + code_module + " is added");
        }
        //console.log(data.filter(h => h.Id == code_module)[0]);
        resolve(this.courses);})
      })
  }
  saveCourses(){
    this.courses.map(course => this.saveCourse(course));
  }

  saveCourse(course: CourseData){
    this.storage.set(course.label + "_data", course);
  }

  // remove everything we already know from the smarphone
  // Caution : we have to send the answers.
  disconnect(){
    console.log(this.ldap + " is disconnected");
    this.connected = false;
    this.storage.clear();
  }

}
