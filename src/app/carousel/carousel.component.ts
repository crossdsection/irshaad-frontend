import { Input, ViewChild, Component, AfterViewInit, Directive, ContentChildren, ViewChildren, QueryList, TemplateRef, ElementRef, Output, EventEmitter } from '@angular/core';
import { AnimationFactory, animate, style, AnimationBuilder } from '@angular/animations';

@Directive({
  selector: '[carouselItem]'
})
export class CarouselItemDirective {
  constructor( public tpl : TemplateRef<any> ) { }
}

@Directive({
  selector: '.carousel-item'
})
export class CarouselItemElement {
  constructor( public element : ElementRef<any> ){ }
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {

  @ContentChildren( CarouselItemDirective ) items : QueryList<CarouselItemDirective>;
  @ViewChildren( CarouselItemElement, { read: ElementRef } ) private itemsElements : QueryList<ElementRef>;
  @ViewChild('carousel') private carousel : ElementRef;
  @Input() showPrev = false;
  @Input() showNext = false;
  @Output() argBehaviour = new EventEmitter<string>();
  private itemWidth : number;
  public offset = 0;
  public currentSlide = 0;
  public carouselWrapperStyle = {};

  constructor( public _builder : AnimationBuilder ) { }

  ngAfterViewInit() {
    this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
  }

  enableBehaviour() {
    this.argBehaviour.emit('complete');
  }

  change( state ) {
    if( this.currentSlide + 1 === this.items.length ) return;
    let slidingAnime : AnimationFactory;
    if( state == 'next' ){
      this.currentSlide = ( this.currentSlide + 1 ) % this.items.length;
      this.offset = this.currentSlide * this.itemWidth;
      console.log( this.offset );
      slidingAnime = this._builder.build([
         animate( '250ms ease-in', style({ transform: `translateX(-${ this.offset }px)` }))
      ]);
    } else {
      this.currentSlide = ( ( this.currentSlide - 1 ) + this.items.length ) % this.items.length;
      this.offset = this.currentSlide * this.itemWidth;
      console.log( this.offset );
      slidingAnime = this._builder.build([
         animate( '250ms ease-in', style({ transform: `translateX(${ this.offset }px)` }))
      ]);
    }
    const player = slidingAnime.create(this.carousel.nativeElement);
    player.play();
  }
}
