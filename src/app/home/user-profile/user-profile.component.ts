import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public workplace: boolean = false;
  public college: boolean = false;
  public school: boolean = false;
  constructor() { }

  toggleWorkplace(){
    this.workplace = !this.workplace;

  } 
  toggleCollege(){
    this.college = !this.college;

  } 
  toggleSchool(){
    this.school = !this.school;

  }


  ngOnInit() {
  }

}
