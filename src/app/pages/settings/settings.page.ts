import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { CashService } from '../../services/cash.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  currency = '';

  constructor(private cashService: CashService, private toastCtrl: ToastController, private router: Router) {}

  async ngOnInit() {
    this.currency = await this.cashService.getSelectedCurrency();
  }

  async updateCurrency() {
    await this.cashService.updateCurrency(this.currency);
    const toast = await this.toastCtrl.create({
      message: 'Currency updated',
      duration: 2000
    });
    await toast.present();
  }

  async clearData() {
    await this.cashService.clearData();
    const toast = await this.toastCtrl.create({
      message: 'Everything deleted',
      duration: 2000
    });
    await toast.present();
    this.router.navigateByUrl('/intro', { replaceUrl: true });
  }

  async showIntro() {
    await this.cashService.resetIntro();
    this.router.navigateByUrl('/intro', { replaceUrl: true });
  }
}
