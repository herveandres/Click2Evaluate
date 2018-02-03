import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { StudentsData } from "../../providers/students-data";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  account: { ldap: string, password: string }= {
    ldap: '',
    password: ''
  } ;
  key: string;
  incorrectAuthentification: boolean = false;
  stayConnected: boolean;

  constructor(public navCtrl: NavController, public studentsData: StudentsData, private storage: Storage) {
    studentsData.isAlreadyConnected().then(res => {
      if(res){
        this.navCtrl.setRoot(MenuPage);
      }else{
        this.studentsData.courses = [];
        this.storage.clear();
      }
    });

  }
  login(){
    this.studentsData.connect(this.account.ldap, this.account.password, true).then(
        res => {
            if(res){
          this.navCtrl.setRoot(MenuPage);

        }else{
              this.incorrectAuthentification = true;
          }}
      )
  }
}
