import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})  
export class LoginPage {
  account: { email: string, password: string }= {
    email: '',
    password: ''
  } ;
  constructor(public navCtrl: NavController) {

  }
  login(){
    this.navCtrl.push(MenuPage);
  }

}
