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
  ldap: string; // id like vorname.name@enpc.fr
  connected: boolean = false;
  courses: Array<CourseData> = []; // list of courses


  constructor(public http: Http, public surveyData:SurveyData, private storage: Storage){
  }

  isAlreadyConnected(){
      return new Promise(resolve => {
          this.storage.get("ldap").then(res => {
            console.log(res)
            this.ldap = res;
            if(this.ldap != null){
              this.connected = true;
            }else{
              this.connected = false;
            }
            resolve (this.connected);
      })});
  }

  connect(ldap: string, password: string, stayConnected: boolean){
    this.courses = [];
    console.log("Trying to connect : " + ldap);
    this.ldap = ldap;

    if(stayConnected){
      this.storage.set("ldap", ldap);
    }else{
      this.storage.remove("ldap");
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

  getCoursesFromLocalStorage(){
    console.log("Trying to get courses from local storage for " + this.ldap);
    if(this.connected){
      this.storage.get("courses_data").then(res => {
      if(res != null){
        this.courses = res;
        return true;
      }
    });
    console.log("Nothing in local storage");
    return false; // nothing is in local storage
    }
    console.log("Nobody is connected");
    return false;
  }

  getCoursesOnline(){
    this.courses = [];
    console.log("Trying to get courses online for " + this.ldap);
    if(this.connected){
      if(this.courses.length > 0){
        return Promise.resolve(this.courses);
      }else{
        return new Promise(resolve =>
          {
          this.http.get('assets/data/data_students.json')
          .map(res => res.json())
          .subscribe(courses =>
            {
            let raw:any = courses.filter(h => h.LOGIN_LDAP == this.ldap);
            //console.log(raw);
            raw.map(x =>
              {
              this.addCourse(x.CODE_MODULE, x.SC_GROUPE, false);
              });
            resolve(this.courses);
            })
          });
      }
    }else{
      console.log("Nobody is connected.");
    }
  }
  getCourses(){
    console.log("Trying to get courses for : " + this.ldap);
    if(this.courses.length > 0){
      console.log("Courses already loaded");
      return true;
    }
    if(this.connected){
      // get courses in local storage
      if(this.getCoursesFromLocalStorage()){
        return true;
      }else{
        this.getCoursesOnline().then(res => {console.log(res);});

        return true;
      }
    }
  }

  addCourse(code_module: string, group: number, answered: boolean){
    console.log("Trying to add course with id : " + code_module);
    return new Promise(resolve => {
      this.http.get('assets/data/data_courses.json')
      .map(res => res.json())
      .subscribe(data => {
        let course = new CourseData(data.filter(h => h.Id == code_module)[0], group, answered);
        this.courses.push(course);
        if(data.filter(h => h.Id == code_module)[0]){
          console.log("Course : " + code_module + " is added");
        }
        resolve(this.courses);})
      })
  }

  saveCourses(){
    console.log("Saving courses");
    this.storage.set("courses_data", this.courses);
    this.storage.get("courses_data").then(res => {console.log(res);})
  }


  // remove everything we already know from the smarphone
  // Caution : we have to send the answers.
  disconnect(){
    this.courses = [];
    console.log(this.ldap + " is now disconnected");
    this.connected = false;
    this.storage.clear();
  }

}
