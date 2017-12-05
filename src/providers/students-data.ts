import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { CourseData } from '../providers/course-data';

// Connect somebody (verify if ldap and password corresponding)
// and download the list of his courses
// If stayConnected save the data in the local storage (TODO)
// Now it works with .json files in assets/data/

@Injectable()
export class StudentsData{
  ldap: string = ""; // id like vorname.name@enpc.fr
  connected: boolean = false;
  courses: Array<CourseData> = []; // list of courses


  constructor(public http: Http){
  }

  connect(ldap: string, password: string){
    this.courses = [];
    console.log("Trying to connect : " + ldap);
    this.ldap = ldap;
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
              this.addCourse(x.CODE_MODULE, x.SC_GROUPE);
              });
            resolve(this.courses);
          })
        })
      }
    }else{
      console.log("Nobody is connected.");
    }
  }

  addCourse(code_module: string, group: number){
    console.log("Trying to add course with id : " + code_module);
    return new Promise(resolve => {
      this.http.get('assets/data/data_courses.json')
      .map(res => res.json())
      .subscribe(data => {
        this.courses.push(new CourseData(data.filter(h => h.Id == code_module)[0], group));
        if(data.filter(h => h.Id == code_module)[0]){
          console.log("Course : " + code_module + " is added");
        }
        //console.log(data.filter(h => h.Id == code_module)[0]);
        resolve(this.courses);})
      })
  }

  // remove everything we already know from the smarphone
  // Caution : we have to send the answers.
  disconnect(){
    this.connected = false;
    this.courses = [];
  }


}
