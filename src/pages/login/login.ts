import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { StudentsData } from "../../providers/students-data";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { email: string, password: string }= {
    email: '',
    password: ''
  } ;
  incorrectAuthentification: boolean = false;
  stayConnected: boolean;

  constructor(public navCtrl: NavController, public studentsData: StudentsData) {

  }
  login(){
    this.studentsData.connect(this.account.email, this.account.password).then(
      res => {
          if(res){
          this.navCtrl.setRoot(MenuPage);
        }else{
          this.incorrectAuthentification = true;
        }
      }
    )

  }

}
