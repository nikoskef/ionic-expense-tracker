import Swiper, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

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

  constructor(private storage: Storage, private router: Router) {}

  ngOnInit() {}

  next() {
    this.swiper.swiperRef.slideNext();
  }

  async saveAndStart() {
    await this.storage.set('seen-intro', true);
    await this.storage.set('selected-currency', this.currency);
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
