import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-enact-feeds-focus',
  templateUrl: './enact-feeds-focus.component.html',
  styleUrls: ['./enact-feeds-focus.component.css']
})
export class EnactFeedsFocusComponent implements OnInit {

  public postType : String = 'court';
  @Input() filterBy : String;

  @Input() mcph: string = "";

  constructor() { }

  ngOnInit() {
  }

  changePostType( arg ){
    this.postType = arg;
  }

  filter( attribute ){
    this.filterBy = attribute;
  }

}
