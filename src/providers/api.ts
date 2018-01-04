import { Injectable } from '@angular/core';

// This class contains all data used to connect the API


export class API{
  url: string = "http://127.0.0.1:8000/api/";
  user: string = "app";
  password: string = "password123";
  noServer: boolean = false;
  auth: any;

  constructor(){
    
  }

}
