import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StudentsData } from "../../providers/students-data";
import {SurveyPage} from "../survey/survey";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  courses: Array<Object> = [];
  connected: boolean = false;
  ldap: string = "";

  constructor(public navCtrl: NavController, public studentsData: StudentsData) {
    this.changeStudent();
  }

  changeStudent(){
    let newLdap = prompt('Quel est votre ldap ?');
    // let newLdap = "marc-antoine.auge@enpc.fr";
    if (newLdap !== ''){
      this.ldap = newLdap;
      this.studentsData.connect(newLdap).then(
        (theResult:boolean) => {this.connected = theResult;
        if(this.connected){
          this.studentsData.getCourses().then(
            (courses_found:Array<Object>) => {this.courses = courses_found;}
          );
        }}
      )}
  }
  openSurvey(){
     this.navCtrl.push(SurveyPage);
  }


}
