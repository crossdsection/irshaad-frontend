import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RightOverlayCommunicationService } from '../services/right-overlay-communication.service';

@Component({
  selector: 'app-enaction-link',
  templateUrl: './enaction-link.component.html',
  styleUrls: ['./enaction-link.component.css']
})
export class EnactionLinkComponent implements OnInit {

  mcph : number = 0;

  constructor( private activatedRoute: ActivatedRoute, private rightOverlayCommuncationService: RightOverlayCommunicationService ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.mcph = params['id'];
      this.rightOverlayCommuncationService.invokeRightOverlayWith("EnactDetailComponent", this.mcph );
    });
  }

}
