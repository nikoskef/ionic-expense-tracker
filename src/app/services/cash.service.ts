import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const TRANSACTION_KEY = 'transactions';
const SELECTED_CURRENCY_KEY = 'selected-currency';

export enum CashFlow {
  expense = 0,
  income = 1
}

interface Category {
  name: string;
  icon: string;
}
export interface Transaction {
  createdAt: number;
  title: string;
  value: number;
  notes: string;
  type: CashFlow;
  category: Category;
}

@Injectable({ providedIn: 'root' })
export class CashService {
  constructor(private storage: Storage) {}

  getCategories(): Category[] {
    return [
      { name: 'Food', icon: 'pizza' },
      { name: 'Rent', icon: 'business' },
      { name: 'Shopping', icon: 'cart' },
      { name: 'Sports', icon: 'fitness' },
      { name: 'Education', icon: 'school' },
      { name: 'Travel', icon: 'airplane' }
    ];
  }

  async addTransaction(transaction: Transaction) {
    const transactions = await this.getTransactions();
    transactions.push(transaction);
    return this.storage.set(TRANSACTION_KEY, transactions);
  }

  async getTransactions(): Promise<Transaction[]> {
    const transactions: Transaction[] | null = await this.storage.get(TRANSACTION_KEY);

    if (transactions) {
      return transactions.sort((trans, trans2) => trans2.createdAt - trans.createdAt);
    }
    return [];
  }

  async getGroupedTransactions() {
    const transactions = await this.getTransactions();

    const resultObject = {};

    for (const transaction of transactions) {
      if (resultObject[transaction.category.name]) {
        resultObject[transaction.category.name].transactions.push(transaction);
      } else {
        resultObject[transaction.category.name] = { icon: transaction.category.icon, transactions: [transaction] };
      }
    }

    const result = [];
    Object.keys(resultObject).forEach((category) => {
      result.push({
        category,
        icon: resultObject[category].icon,
        transactions: resultObject[category].transactions
      });
    });

    return result;
  }

  updateTransactions(transactions: Transaction[]): Promise<void> {
    return this.storage.set(TRANSACTION_KEY, transactions);
  }

  async getSelectedCurrency(): Promise<string> {
    return this.storage.get(SELECTED_CURRENCY_KEY);
  }

  updateCurrency(selected: string): Promise<void> {
    return this.storage.set(SELECTED_CURRENCY_KEY, selected);
  }

  clearData(): Promise<void> {
    return this.storage.clear();
  }

  resetIntro(): Promise<void> {
    return this.storage.remove('seen-intro');
  }
}
