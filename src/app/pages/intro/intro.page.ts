import Swiper, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

Swiper.use([Pagination]);

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IntroPage implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;

  currency = 'eur';
  config: SwiperOptions = {
    pagination: true
  };

  constructor() {}

  ngOnInit() {}

  next() {
    this.swiper.swiperRef.slideNext();
  }

  saveAndStart() {}
}
