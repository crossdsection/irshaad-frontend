import { Input, ViewChild, Component, AfterViewInit, Directive, ContentChildren, ViewChildren, QueryList, TemplateRef, ElementRef } from '@angular/core';
import { trigger, style, group, transition, state, animate, keyframes, query, stagger } from '@angular/animations';

@Directive({
  selector: '[carouselItem]'
})
export class CarouselItemDirective {
  constructor( public tpl : TemplateRef<any> ) {
    console.log( tpl );
  }
}

@Directive({
  selector: '.carousel-item'
})
export class CarouselItemElement {
  constructor( public element : ElementRef<any> ){
    console.log( element );
  }
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('animateSlide', [
      // state('for', [
      //     // animate( 250ms ease-in, style({ transform: `translateX(-${ offset }px)` }))
      // ]),
      // transition('* => for', [
        // animate( '250ms ease-in', style({ transform: `translateX(-${ newoffset }px)` }))
      // ])
    ])
  ]
})
export class CarouselComponent implements AfterViewInit {

  @ContentChildren( CarouselItemDirective ) items : QueryList<CarouselItemDirective>;
  @ViewChildren( CarouselItemElement, { read: ElementRef } ) private itemsElements : QueryList<ElementRef>;
  @ViewChild('carousel') private carousel : ElementRef;
  // @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private itemWidth : number;
  public currentSlide = 0;
  public offset = 0;
  public carouselWrapperStyle = {};
  public triggerVal : boolean;

  constructor() {
    this.triggerVal = false;
  }

  ngAfterViewInit() {
    // this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
    this.itemWidth = 100;
  }

  next() {
    if( this.currentSlide + 1 === this.items.length ) return;
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    this.offset = this.currentSlide * this.itemWidth;
    this.triggerVal = !this.triggerVal;
  }

  prev() {
    if( this.currentSlide === 0 ) return;
    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    this.offset = this.currentSlide * this.itemWidth;
    this.triggerVal = !this.triggerVal;
  }
}
