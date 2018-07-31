import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enact-feeds-focus',
  templateUrl: './enact-feeds-focus.component.html',
  styleUrls: ['./enact-feeds-focus.component.css']
})
export class EnactFeedsFocusComponent implements OnInit {

  public postType : String = 'court';

  constructor() { }

  ngOnInit() {
  }

  changePostType( arg ){
    this.postType = arg; 
  }

}
