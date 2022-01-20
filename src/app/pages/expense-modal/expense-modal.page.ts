import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CashFlow, CashService, Transaction } from '../../services/cash.service';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.page.html',
  styleUrls: ['./expense-modal.page.scss']
})
export class ExpenseModalPage implements OnInit {
  categories = this.cashService.getCategories();
  createdAt = new Date().toISOString();
  transaction: Transaction = {
    createdAt: Date.now(),
    title: '',
    notes: '',
    value: 0,
    type: CashFlow.expense,
    category: this.categories[0]
  };

  constructor(private cashService: CashService, private modalCtrl: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  addTransaction() {
    console.log('store: ', this.transaction);
  }
}
