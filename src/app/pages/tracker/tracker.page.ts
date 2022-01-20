import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ExpenseModalPage } from '../expense-modal/expense-modal.page';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss']
})
export class TrackerPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async trackExpense() {
    const modal = await this.modalCtrl.create({
      component: ExpenseModalPage,
      breakpoints: [0, 0.4, 1],
      initialBreakpoint: 0.4
    });

    modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);
  }
}
