import { Component, OnInit } from '@angular/core';
import {User} from '../user'

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.css']
})
export class CreateEventsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  prioriries=['High','Medium','Low'];
  userModel=new User('','',0,'','','');



}
